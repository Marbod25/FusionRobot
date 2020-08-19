import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { map, catchError, tap, shareReplay, switchMap } from 'rxjs/operators';
import { Ingredient } from './ingredient.model';
import { Observable, throwError, BehaviorSubject, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from './product.model';

@Injectable({
    providedIn: 'root'
  })
  export class IngredientDataService {
    private _ingredients$ = new BehaviorSubject<Ingredient[]>([]);
    private _ingredients: Ingredient[];
    private _reload$ = new BehaviorSubject<boolean>(true);

    constructor(private http : HttpClient) {
        this.ingredient$
        .pipe(
          catchError((err) => {
            this._ingredients$.error(err);
            return throwError(err);
          })
        )
        .subscribe((categories: Ingredient[]) => {
          this._ingredients = categories;
          this._ingredients$.next(this._ingredients);
        });
    }

    get allIngredients$(): Observable<Ingredient[]> {
        return this._ingredients$;
    }

    get ingredient$(): Observable<Ingredient[]>
    {
      return this._reload$.pipe(
        switchMap(() => this.fetchIngredients$())
      );
    }

    fetchIngredients$(): Observable<Ingredient[]>
    {
      return this.http.get(`${environment.apiUrl}/Ingredient/`).pipe(catchError(this.handleError), map((list: any[]): Ingredient[] => list.map(Ingredient.fromJSON)));
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