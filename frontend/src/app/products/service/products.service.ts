import { Product } from './../model/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { first, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private API_URL = 'http://localhost:8080/products';

  constructor(private httpClient: HttpClient) {}

  findAll(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.API_URL)
    .pipe(
      first(),
      tap(p => console.log(p))
    )
  }

  findById() {}

  create() {}

  delete() {}

  edit() {}
}
