import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, EMPTY, map, Observable, of, tap } from 'rxjs';

import { Product } from '../model/product';
import { ProductsService } from './../service/products.service';

// import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {

  // pesquisaCpf: FormGroup;
  queryField = new FormControl();
  SEARCH_URL = 'http://localhost:8080/products';
  results$: Observable<any> = EMPTY;
  total: number = 0;

  productsArray: Product[] = [];
  productsObservable$: Observable<Product[]> = EMPTY;
  displayedColumns = ['name', 'quantity', 'price', 'acctions'];

  constructor(
    // private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {
    // this.queryField = this.formBuilder.group({
    //   cpf: [null],
    // });
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

  onAdd() {
    console.log('Adicionando...');
    this.router.navigate(['new'], { relativeTo: this.activatedRoute });
  }

  onDelete(id: number) {
    this.productsService.delete(id).subscribe({
      next: (v) => console.log(v),
      error: (e) => console.log(e),
      complete: () =>
        (this.productsObservable$ = this.productsService.findAll()),
    });
  }

  onEdit(id: number) {
    this.router.navigate([id.toString() + '/edit'], {
      relativeTo: this.activatedRoute,
    });
  }
  pesquisarCpf(){
    console.log(this.queryField.value)
  }

  onSearch(){
    console.log(this.queryField.value);

    this.results$ = this.http.get(this.SEARCH_URL)
    // .pipe(
    //   tap((res: any) => this.total = res.total),
    //   map((res: any) => res.results)
    // );
  }
  // onSubmit() {
  //   this.productsService.create(this.form.value).subscribe({
  //     next: (v) => this.onSucess(),
  //     error: (e) => this.snackBar.open(e, '', { duration: 1000 }),
  //     complete: () => console.info('complete'),
  //   });
  // }
}
