import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.scss']
})
export class CategoryMenuComponent implements OnInit {

  categories!:Category[]
  endSub$:Subject<any> = new Subject();
  constructor(private categoryService:CategoryService) { }

  ngOnInit(): void {
    this._getAllCategories();
  }
  private _getAllCategories():void{
    this.categoryService.getCategories().pipe(takeUntil(this.endSub$)).subscribe((data)=> {
      this.categories = data;
    })
  }
}
