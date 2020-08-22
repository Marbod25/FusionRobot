import { Component, OnInit } from '@angular/core';
import { ProductDataService } from '../product-data.service';
import { Product } from '../product.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Ingredient } from '../ingredient.model';

@Component({
  selector: 'app-sheet',
  templateUrl: './sheet.component.html',
  styleUrls: ['./sheet.component.css']
})
export class SheetComponent implements OnInit {
  public namesArray = new Array<String>();
  public productArray = new Array<Product>();
  public ingredientArray = new Array<Ingredient>();
  public drinksArray = new Array<Ingredient>();
  public fruitsArray = new Array<Ingredient>();
  public product: Product;
  public nextPhase = false;

  constructor(public productDataService: ProductDataService) { }

  ngOnInit(): void {
  }

  receiveMessage($event) {
    this.namesArray = [...this.namesArray, $event]
    this.namesArray.forEach(e => {
      this.productDataService.getProductByName(e).subscribe(product$ => {
        this.product = product$;
        this.productArray = [...this.productArray, this.product];
      });
      this.productDataService.getDrinksOfProduct(e).subscribe(drinks$ => {
        drinks$.forEach(drink => this.drinksArray = [...this.drinksArray, drink]);
      });
      this.productDataService.getFruitsOfProduct(e).subscribe(fruits$ => {
        fruits$.forEach(fruit => this.fruitsArray = [...this.fruitsArray, fruit]);
      });    
    });
    this.namesArray = [];
  }
}
