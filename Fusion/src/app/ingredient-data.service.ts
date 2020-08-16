import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { map, catchError, tap, shareReplay, switchMap } from 'rxjs/operators';
import { Category } from './category.model';
import { Observable, throwError, BehaviorSubject, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from './product.model';

@Injectable({
    providedIn: 'root'
  })
  export class CategoryDataService {
    getCategory(categoryId: any) {
      throw new Error("Method not implemented.");
    }
    private _categories$ = new BehaviorSubject<Category[]>([]);
    private _categories: Category[];
    private _reload$ = new BehaviorSubject<boolean>(true);

    constructor(private http : HttpClient) {
        this.category$
        .pipe(
          catchError((err) => {
            this._categories$.error(err);
            return throwError(err);
          })
        )
        .subscribe((categories: Category[]) => {
          this._categories = categories;
          this._categories$.next(this._categories);
        });
    }

    get allCategories$(): Observable<Category[]> {
        return this._categories$;
    }

    get category$(): Observable<Category[]>
    {
      return this._reload$.pipe(
        switchMap(() => this.fetchCategories$())
      );
    }

    fetchCategories$(): Observable<Category[]>
    {
      return this.http.get(`${environment.apiUrl}/Category/`).pipe(catchError(this.handleError), map((list: any[]): Category[] => list.map(Category.fromJSON)));
    }
    
    getProduct$(idC: any, idP: any): Observable<Product>
    {
      return this.http.get(`${environment.apiUrl}/Category/${idC}/Products/${idP}`).pipe(catchError(this.handleError), map(Product.fromJSON));
    }

    getProductsFromCategory$(category?: any): Observable<Product[]>
    {
      return this._reload$.pipe(
        switchMap(() => this.fetchProductsFromCategory$(category))
      );
    }

    fetchProductsFromCategory$(category?: any): Observable<Product[]>
    {
      if (category == undefined)
      {
        return this.http.get(`${environment.apiUrl}/Category/0/Products/`).pipe(catchError(this.handleError), map((list: any[]): Product[] => list.map(Product.fromJSON)));
      }
      return this.http.get(`${environment.apiUrl}/Category/${category}/Products/`).pipe(catchError(this.handleError), map((list: any[]): Product[] => list.map(Product.fromJSON)));
    }

    getCategory$(id: any): Observable<Category>
    {
      return this.http.get(`${environment.apiUrl}/Category/${id}`).pipe(catchError(this.handleError), map(Category.fromJSON));
    }

    addNewProduct(product: Product)
    {
      var categoryId = this._categories.find(c => c.name == product.category).id;
      return this.http.post(`${environment.apiUrl}/Category/${categoryId}/Products/`, product.toJSON()).pipe(catchError(this.handleError), map(Product.fromJSON)).subscribe((p : Product) => {
        this._categories.find(c => c.name == product.category).addProduct(product);
        this._reload$.next(true);
      });
    }

    addNewCategory(category: Category)
    {
      return this.http.post(`${environment.apiUrl}/Category/`, category.toJSON()).pipe(catchError(this.handleError), map(Category.fromJSON)).subscribe((c : Category) => {
        this._categories = [...this._categories, c];
        this._categories$.next(this._categories);
        this._reload$.next(true);
      });
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