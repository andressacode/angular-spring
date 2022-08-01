import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductsService } from './../service/products.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {
    this.form = this.formBuilder.group({
      name: [null],
      quantity: [null],
      price: [null],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.productsService.create(this.form.value).subscribe({
      next: (v) => this.onSucess(),
      error: (e) => this.snackBar.open(e, '', { duration: 1000 }),
      complete: () => console.info('complete'),
    });
  }

  onCancel() {
    this.location.back();
  }

  onSucess() {
    this.snackBar.open('Salvo!', '', { duration: 1000 });
    this.location.back();
  }


}
