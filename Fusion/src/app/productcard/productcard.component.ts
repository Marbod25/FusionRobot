import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../product.model';
import { ProductDataService } from '../product-data.service';

@Component({
  selector: 'app-productcard',
  templateUrl: './productcard.component.html',
  styleUrls: ['./productcard.component.css']
})
export class ProductcardComponent implements OnInit {
  @Input() public product: Product;
  public checkList: boolean[];
  public greenCard = false;

  constructor() { }

  ngOnInit(): void {
    this.checkList = new Array<boolean>(this.product.stappen.length);
  }

  receiveChecks($event) {
    this.checkList = [...this.checkList, $event];
    this.checkList.shift();
    if (this.checkList.every(e => e == true))
    {
      this.greenCard = true;
    }
  }
}
