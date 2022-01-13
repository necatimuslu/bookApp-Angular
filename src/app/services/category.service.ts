import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  api:string = `${environment.apiUrl}/category`;
  constructor(private http:HttpClient) { }

  getCategories():Observable<Category[]>{
    return this.http.get<Category[]>(`${this.api}`);
  }
  getCategoryById(id:string):Observable<Category>{
    return this.http.get(`${this.api}/${id}`);
  }
  getBookCategoryId(id:string):Observable<any>{
    return this.http.get<any>(`${this.api}/book/${id}`)
  }
  createCategory(categoryForm:Category):Observable<Category>{
    return this.http.post<Category>(`${this.api}`,categoryForm);
  }
  updateCategory(id:string,categoryForm:Category):Observable<Category>{
    return this.http.put(`${this.api}/${id}`,categoryForm);
  }
  deleteCategory(id:string):Observable<Category>{
    return this.http.delete(`${this.api}/${id}`);
  }
}
