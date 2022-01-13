import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../modules/material.module';
import { HomeComponent } from './home/home.component';

import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminCategoryNeweditComponent } from './admin-category-newedit/admin-category-newedit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryListComponent } from './admin-home/category-list/category-list.component';
import { AdminBookNeweditComponent } from './admin-book-newedit/admin-book-newedit.component';
import { BookListComponent } from './admin-home/book-list/book-list.component';
import { CategoryMenuComponent } from './category-menu/category-menu.component';
import { BookDetailComponent } from './book-detail/book-detail.component';




@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    AdminHomeComponent,
    AdminCategoryNeweditComponent,
    CategoryListComponent,
    AdminBookNeweditComponent,
    BookListComponent,
    CategoryMenuComponent,
    BookDetailComponent,
    
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[HomeComponent,HeaderComponent,AdminHomeComponent,AdminCategoryNeweditComponent,CategoryMenuComponent]
})
export class PagesModule { }
