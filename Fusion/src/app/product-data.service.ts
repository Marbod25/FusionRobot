import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap, shareReplay, switchMap } from 'rxjs/operators';
import { Product } from './product.model';
import { Observable, throwError, BehaviorSubject, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ingredient } from './ingredient.model';

@Injectable({
    providedIn: 'root'
  })
  export class ProductDataService {
    private _products$ = new BehaviorSubject<Product[]>([]);
    private _products: Product[];
    
    constructor(private http : HttpClient) {
        this.product$
        .pipe(
          catchError((err) => {
            this._products$.error(err);
            return throwError(err);
          })
        )
        .subscribe((products: Product[]) => {
          this._products = products;
          this._products$.next(this._products);
        });
    }

    get allProducts$(): Observable<Product[]> {
        return this._products$;
    }

    get product$(): Observable<Product[]>
    {
      return this.http.get(`${environment.apiUrl}/Product/`).pipe(catchError(this.handleError), map((list: any[]): Product[] => list.map(Product.fromJSON)));
    }

    getProduct$(category: any): Observable<Product[]>
    {
      return this.http.get(`${environment.apiUrl}/Product/${category}`).pipe(catchError(this.handleError), map((list: any[]): Product[] => list.map(Product.fromJSON)));
    }

    getProductByName(name: any): Observable<Product>
    {
      return this.http.get(`${environment.apiUrl}/Product/ByName/${name}`).pipe(catchError(this.handleError), map(Product.fromJSON));
    }
    
    getDrinksOfProduct(name: any): Observable<Ingredient[]>
    {
      return this.http.get(`${environment.apiUrl}/Product/Drinks/${name}`).pipe(catchError(this.handleError), map((list: any[]): Ingredient[] => list.map(Ingredient.fromJSON)));
    }

    getFruitsOfProduct(name: any): Observable<Ingredient[]>
    {
      return this.http.get(`${environment.apiUrl}/Product/Fruits/${name}`).pipe(catchError(this.handleError), map((list: any[]): Ingredient[] => list.map(Ingredient.fromJSON)));
    }

    handleError(err: any): Observable<never>
    {
        let errorMessage: string;
        if (err instanceof HttpErrorResponse) {
          errorMessage = `'${err.status} ${err.statusText}' when accessing '${err.url}'`;
        } else {
          errorMessage = `an unknown error occurred ${err}`;
        }
        console.error(err);
        return throwError(errorMessage);
    }
  }