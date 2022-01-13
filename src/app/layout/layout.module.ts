import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { PagesModule } from '../pages/pages.module';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminHomeComponent } from '../pages/admin-home/admin-home.component';
import { AdminCategoryNeweditComponent } from '../pages/admin-category-newedit/admin-category-newedit.component';
import { AdminBookNeweditComponent } from '../pages/admin-book-newedit/admin-book-newedit.component';
import { BookDetailComponent } from '../pages/book-detail/book-detail.component';


const routes :Routes = [
  {path:'',component:MainLayoutComponent,
  children:[
    {path:'',component:HomeComponent},
    {path:'category/:id',component:HomeComponent},
    {path:'book/:id',component:BookDetailComponent}
  ]

  },
  {path:'admin',component:AdminLayoutComponent,
  children:[
    {path:'',component:AdminHomeComponent},
    {path:'category',component:AdminCategoryNeweditComponent},
    {path:'category/:id',component:AdminCategoryNeweditComponent},
    {path:'book',component:AdminBookNeweditComponent},
    {path:'book/:id',component:AdminBookNeweditComponent}
  ]
  }
]

@NgModule({
  declarations: [
    MainLayoutComponent,
    AdminLayoutComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PagesModule
    
  ],
  exports:[AdminLayoutComponent]
})
export class LayoutModule { }
