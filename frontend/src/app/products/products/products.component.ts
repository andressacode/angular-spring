import { ProductsService } from './../service/products.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { EMPTY, Observable, of } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  productsArray: Product[] = [];
  productsObservable$: Observable<Product[]> = EMPTY;
  displayedColumns = ['id', 'name', 'quantity', 'price'];

  constructor(private productsService: ProductsService) {
    // productsService
    //   .findAll()
    //   .subscribe((dados) => (this.productsArray = dados));
    // this.productsObservable$ = productsService.findAll();

    this.productsService.findAll().subscribe((dados: any) => {
      this.productsObservable$ = of(dados.content);
    });
  }

  ngOnInit(): void {}
}
