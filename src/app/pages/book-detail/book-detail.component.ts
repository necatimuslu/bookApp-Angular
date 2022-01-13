import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {

  book!:Book;
  bookdId!:string | any;
  endSub$:Subject<any> = new Subject()
  constructor(private bookService:BookService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.bookdId = this.route.snapshot.paramMap.get('id');

    if(this.bookdId){
      this._getBokById(this.bookdId)
    }
  }
  private _getBokById(id:string){
    this.bookService.getBookById(id).pipe(takeUntil(this.endSub$)).subscribe((data)=> {
      this.book = data;
    })
  }
}
