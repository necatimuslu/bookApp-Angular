import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule  } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LayoutModule } from './layout/layout.module';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { CategoryService } from './services/category.service';
import { BookService } from './services/book.service';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    LayoutModule
  ],
  providers: [ConfirmationService,CategoryService,BookService,ToastrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
