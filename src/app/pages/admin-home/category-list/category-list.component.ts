import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {ConfirmationService} from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  displayedColumns: string[] = ['no', 'name','action'];
  dataSource: any
  categories!:any[];
  endSubs$:Subject<any> = new Subject();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private categoryService:CategoryService, private confirmationService:ConfirmationService, private toastService:ToastrService) { }

  ngOnInit(): void {
    this._getCategories()
    
  }
  private _getCategories():void{
    this.categoryService.getCategories().pipe(takeUntil(this.endSubs$)).subscribe((data)=> {
      this.categories = data;

      this.categories.forEach((c,i)=> {
        this.categories[i]['no'] = i + 1
      })

      this.dataSource = new MatTableDataSource<Category>(this.categories)

      this.dataSource.paginator = this.paginator;
    })
  }
  onDelete(id:string):void{
    this.confirmationService.confirm({
      message: 'Seçilen kategoriyi silmek istediğinizden emin misiniz?',
      accept: () => {
          this.categoryService.deleteCategory(id).subscribe(()=> {
            this.toastService.error('Kategori silindi')
            this._getCategories()
          })
      },
      reject: () => {
        null
      }
  });
  }
}
