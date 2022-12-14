import { ProductsTestsComponent } from './products-tests/products-tests.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
  },
  {
    path: 'new',
    component: ProductFormComponent,
  },
  {
    path: 'tests',
    component: ProductsTestsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
