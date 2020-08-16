import { Component, OnInit, Input } from '@angular/core';
import { ProductDataService } from '../product-data.service';
import { catchError } from 'rxjs/operators';
import { Product } from '../product.model';
import { Observable, empty } from 'rxjs';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.css']
})
export class SelectorComponent implements OnInit {
  @Input() public category: String;
  private _fetchProducts$: Observable<Product[]>;
  public errorMessage: string = '';
  public products: Product[];

  constructor(private _productDataService: ProductDataService) { }

  ngOnInit(): void {
    this._fetchProducts$ = this._productDataService.getProduct$(this.category).pipe(catchError(err => { this.errorMessage = err;  return empty; }));
  }

  get products$(): Observable<Product[]> 
  {
    return this._fetchProducts$;
  }
}
