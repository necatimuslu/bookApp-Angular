import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Category } from 'src/app/models/category';

import { BookService } from 'src/app/services/book.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-admin-book-newedit',
  templateUrl: './admin-book-newedit.component.html',
  styleUrls: ['./admin-book-newedit.component.scss']
})
export class AdminBookNeweditComponent implements OnInit {

  categories!:Category[]
  categoryId!:string | any;
  bookdId!:string | any;
  title!:string;
  btnText!:string;
  type!:string;
  isSubmmited = false;
  form!:FormGroup;
  imageDisplay!:string | ArrayBuffer | any; 
  endSub$:Subject<any> = new Subject()
  constructor(private bookService:BookService,private formBuilder:FormBuilder, private route:ActivatedRoute, private toast:ToastrService, private router:Router, private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.bookdId = this.route.snapshot.paramMap.get('id');

    if(this.bookdId === null){
      this.title = 'Kitap Ekle',
      this.btnText = 'Ekle',
      this.type = 'add'
    }else {
      this.title = 'Kitap Güncelle',
      this.btnText = 'Güncelle',
      this.type = 'edit'
    }

    this._initForm()
    this._editMode();
    this._getCategories();
  }
  private _initForm():void{
    this.form = this.formBuilder.group({
      title:['',Validators.required],
      author:['',Validators.required],
      price:[''],
      stock:[''],
      image:[''],
      category:['']
    })
  }
  private _editMode(){
    if(this.bookdId){
      this.bookService.getBookById(this.bookdId).subscribe((book)=> {
        this.form.controls.title.setValue(book.title);
        this.form.controls.price.setValue(book.price);
        this.form.controls.author.setValue(book.author);
        this.form.controls.stock.setValue(book.stock);
        this.form.controls.category.setValue(book.category);
        this.imageDisplay = book.image;
        this.form.controls.image.setValidators([]);
        this.form.controls.image.updateValueAndValidity();
        
      })
    }
  }
  private _getCategories():void{
    this.categoryService.getCategories().pipe((takeUntil(this.endSub$))).subscribe((data)=> {
      this.categories = data;
    })
  }
  onSubmit():void {
    this.isSubmmited = true;
    if(this.form.valid){
      let bookForm = new FormData();
        Object.keys(this.form.controls).map((key)=> {
          bookForm.append(key,this.form.controls[key].value)
          
        })
        
      if(this.type === 'add'){
        

        this.bookService.createBook(bookForm).subscribe((data)=> {
          this.toast.success('Kitap başarıyla eklendi');
          this.router.navigateByUrl('/admin')
        })
      }else{
        this.bookService.updateBook(this.bookdId,bookForm).subscribe((data)=> {
          this.toast.success('Kitap başarıyla güncellendi');
          this.router.navigateByUrl('/admin')
        })
      }
    }
  }
  displayCategoryName(category:any){
    if(category){
      return category.name
    }
    return null
  }
  onImageUpload(event:any){
    const file = event.target.files[0];
    if(file){
      this.form.patchValue({image:file});
      this.form.get('image')?.updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = ()=> {
        this.imageDisplay = fileReader.result;
      }
      fileReader.readAsDataURL(file);
    }
  }
}
