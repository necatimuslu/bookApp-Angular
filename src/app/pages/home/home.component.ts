import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { CategoryService } from 'src/app/services/category.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  books!:Book[] | any;
  categoryId!:string | any;
  endSub$:Subject<any> = new Subject();
  constructor(private bookService:BookService, private route:ActivatedRoute, private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params)=> {
      this.categoryId = params.get('id');

      if(this.categoryId){
        this.categoryService.getBookCategoryId(this.categoryId).subscribe((data)=> {
          this.books = data
          console.log(this.books)
        })
      }else {
        this._getAllBoks();
      }
    })
    
  }

  private _getAllBoks():void{
    this.bookService.getBooks().pipe(takeUntil(this.endSub$)).subscribe((data)=> {
      this.books = data;
    })
  }
 
}
