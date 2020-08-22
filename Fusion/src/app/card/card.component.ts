import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../product.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() public stap: string;
  @Output() allChecked = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  onCheckChange(event) {
    /* Selected */
    if(event.target.checked){
      this.allChecked.emit(true);
    }
  }

}
