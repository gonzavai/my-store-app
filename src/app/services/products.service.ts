import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  filter,
  first,
  last,
  Observable,
  Subject,
  take,
  takeLast,
  tap,
  pipe,
  BehaviorSubject,
} from 'rxjs';
import { Product, ProductIdx } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  productsIdx$ = new Subject<ProductIdx[]>();
  productsValues$ = new BehaviorSubject<ProductIdx[]>([]);

  selectedProduct$ = new Subject<Product | undefined>();

  constructor(private http: HttpClient, private router: Router) {}

  getProductosIdx() {
    this.http
      .get(
        'https://angular-shoppingstore-default-rtdb.firebaseio.com/products_idx.json'
      )
      .subscribe((resp) => {
        this.productsIdx$.next(
          Object.values(resp).map((item: Product) => item)
        );
        this.productsValues$.next(
          Object.values(resp).map((item: Product) => item)
        );
      });
  }

  getProductoByCod(searchCode: string) {
    this.http
      .get(
        `https://angular-shoppingstore-default-rtdb.firebaseio.com/products/${searchCode}.json`
      )
      .subscribe((resp: Product) => {
        this.selectedProduct$.next(resp);
      });
  }

  filterByName(title: string) {
    const titleLower = title.toLocaleLowerCase();
    const filteredData = this.productsValues$
      .getValue()
      .filter((prod) => prod.titulo?.toLocaleLowerCase()?.includes(titleLower));
    if (filteredData.length > 0) {
      this.productsIdx$.next(filteredData);
    } else {
      this.productsIdx$.next(this.productsValues$.getValue());
    }
  }
}
