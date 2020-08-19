import { Component, OnInit, Input } from '@angular/core';
import { ProductDataService } from '../product-data.service';
import { catchError } from 'rxjs/operators';
import { Product } from '../product.model';
import { Observable, empty } from 'rxjs';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';

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
  public productsGroup: FormGroup;

  constructor(private _productDataService: ProductDataService, private fb : FormBuilder) { }

  ngOnInit(): void {
    this._fetchProducts$ = this._productDataService.getProduct$(this.category).pipe(catchError(err => { this.errorMessage = err;  return empty; }));
    this.productsGroup = this.fb.group({names: new FormArray([])});
  }

  get products$(): Observable<Product[]> 
  {
    return this._fetchProducts$;
  }

  createProducts(): FormGroup
  {
    return this.fb.group({productName: [""]});
  }

  onSubmit() {
    //Submit de producten die gekozen zijn en geef ze door aan sheet zodat fases kunnen doorlopen worden
    console.log(this.productsGroup.get('names'))
  }

  get names(): FormArray
  {
    return <FormArray> this.productsGroup.get('names');
  }

  onCheckChange(event) {
    const formArray: FormArray = this.productsGroup.get('names') as FormArray;
    /* Selected */
    if(event.target.checked){
    // Add a new control in the arrayForm
    formArray.push(new FormControl(event.target.value));
    }
    /* unselected */
    else{
     // find the unselected element
      let i: number = 0;
      formArray.controls.forEach((ctrl: FormControl) => {
          if(ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }
        i++;
      });
    }

  }
}
