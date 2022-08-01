import { Product } from './../model/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private API_URL = 'http://localhost:8080/products';

  constructor(private httpClient: HttpClient) {}

  findAll(): Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.API_URL)
    .pipe(
      delay(290),
      first(),
      tap(p => console.log(p))
    )
  }

  findById() {}

  create(product: Product) {
    return this.httpClient.post(this.API_URL, product);
  }

  delete(id: number) {
    return this.httpClient.delete(this.API_URL+"/"+id.toString());
  }

  edit() {}
}
