import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Book } from '../models/book';
@Injectable({
  providedIn: 'root'
})
export class BookService {

  api:string = `${environment.apiUrl}/book`
  constructor(private http:HttpClient) { }

  getBooks():Observable<Book[]>{
    return this.http.get<Book[]>(`${this.api}`)
  }
  getBookById(id:string):Observable<Book>{
    return this.http.get<Book>(`${this.api}/${id}`);
  }
  

  createBook(bookForm:FormData):Observable<Book>{
    return this.http.post<Book>(`${this.api}`,bookForm);
  }

  updateBook(id:string,bookForm:FormData):Observable<Book>{
    return this.http.put<Book>(`${this.api}/${id}`,bookForm);
  }

  deleteBook(id:string):Observable<{}>{
    return this.http.delete<{}>(`${this.api}/${id}`);
  }
}
