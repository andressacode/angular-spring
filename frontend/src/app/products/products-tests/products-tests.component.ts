import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, EMPTY, tap, map, filter, debounceTime, distinctUntilChanged } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-products-tests',
  templateUrl: './products-tests.component.html',
  styleUrls: ['./products-tests.component.scss'],
})
export class ProductsTestsComponent implements OnInit {
  queryField = new FormControl();
  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries';
  results$: Observable<any> = EMPTY;
  total: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.queryField.valueChanges
    .pipe(
      map(value => value.trim()),
      filter(value => value.length > 3),
      debounceTime(200),
      distinctUntilChanged(),
      tap(value => console.log(value)),
    ).subscribe();
  }

  onSearch() {

    const fields = 'name, description, version, homepage';

    let value = this.queryField.value;

    if (value && (value = value.trim()) !== '') {

      const params_ = {
        search: value,
        fields: fields
      }

      let params = new HttpParams();
      params = params.set('search', value);
      params = params.set('fields', fields);

      this.results$ = this.http
        .get(this.SEARCH_URL, { params })
        .pipe(
          tap((res: any) => (this.total = res.total)),
          map((res: any) => res.results)
        );
    }
  }
}
