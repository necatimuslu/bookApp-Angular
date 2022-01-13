import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  books!:any[]
  displayedColumns: string[] = ['no', 'Başlık', 'Resim', 'Yazar','Fiyat','Kategori','Aksiyon'];
  dataSource:any;
  endSub$:Subject<any> = new Subject()
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private bookService:BookService, private confirmationService:ConfirmationService, private toast:ToastrService) { }

  ngOnInit(): void {
    this._getBooks()
  }

  private _getBooks():void{
    this.bookService.getBooks().pipe(takeUntil(this.endSub$)).subscribe((data)=> {
      this.books = data;

      this.books.forEach((book,i)=> {
        this.books[i]['no'] = i + 1
      })

      this.dataSource = new MatTableDataSource<Book>(this.books)

      this.dataSource.paginator = this.paginator

    })
  }

  onDelete(id:string):void{
    
    this.confirmationService.confirm({
      message: 'Seçilen kitabı silmek istediğinizden emin misiniz?',
      accept: () => {
          this.bookService.deleteBook(id).subscribe(()=> {
            this.toast.error('Kitap silindi')
            this._getBooks()
          })
      },
      reject: () => {
        null
      }
  });
  }

}
