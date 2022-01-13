import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import {  takeUntil } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-admin-category-newedit',
  templateUrl: './admin-category-newedit.component.html',
  styleUrls: ['./admin-category-newedit.component.scss']
})
export class AdminCategoryNeweditComponent implements OnInit,OnDestroy {

  isSubmitting = false;
  title!:string;
  btnText!:string;
  categoryId?:string | any;
  form!:FormGroup;
  type!:string;
  $Subject:Subject<any> = new Subject()
  constructor(private categoryService:CategoryService,private formBuilder:FormBuilder, private router:Router,private route:ActivatedRoute, private toastService:ToastrService) { }

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('id');

    if(this.categoryId === null){
      this.title = 'Kategori Ekle',
      this.btnText = 'Ekle',
      this.type = 'add'
    }else {
      this.title = 'Kategori Güncelle',
      this.btnText = 'Güncelle',
      this.type = 'edit'
    }

    this._initForm()
    this._editMode()
  }

  ngOnDestroy(): void {
      this.$Subject.next();
      this.$Subject.complete();
  }

  private _initForm(){
    this.form = this.formBuilder.group({
      name:['',Validators.required]
    })
  }

  private _editMode(){
    if(this.categoryId){
      this.categoryService.getCategoryById(this.categoryId).subscribe((data)=> {
        this.form.controls.name.setValue(data.name)
      })
    }
  }

  onSubmit(){
    this.isSubmitting = true;
    if(this.form.valid){

      if(this.type === 'add'){
        this.categoryService.createCategory(this.form.value).pipe(takeUntil(this.$Subject)).subscribe((data)=> {
          
          this.toastService.success('Kategori başarıyla eklendi');
          this.router.navigate(['/admin'])
        })
      }else {
        this.categoryService.updateCategory(this.categoryId,this.form.value).pipe(takeUntil(this.$Subject)).subscribe((data)=> {
          this.toastService.success('Kategori başarıyla güncellendi');
          this.router.navigate(['/admin'])
        })
      }
    }
  }

}
