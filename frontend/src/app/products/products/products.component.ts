import { ProductsService } from './../service/products.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../model/product';
import { catchError, EMPTY, Observable, of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  productsArray: Product[] = [];
  productsObservable$: Observable<Product[]> = EMPTY;
  displayedColumns = ['name', 'quantity', 'price', 'acctions'];

  constructor(
    private productsService: ProductsService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    // productsService
    //   .findAll()
    //   .subscribe((dados) => (this.productsArray = dados));
    // this.productsObservable$ = productsService.findAll();

    this.productsService.findAll().subscribe((dados: any) => {
      this.productsObservable$ = of(dados.content).pipe(
        catchError((error) => {
          console.log('Um erro ocorreu');
          this.onError(error.message, 3000);
          return of([]);
        })
      );
    });
  }

  ngOnInit(): void {}

  onError(message: string, duracao: number) {
    this.snackBar.open(message, '', {
      duration: duracao,
    });
  }

  onAdd(){
    console.log('Adicionando...');
    this.router.navigate(['new'], {relativeTo: this.activatedRoute})
  }
}
