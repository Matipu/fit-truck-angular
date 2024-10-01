import { Component, Input} from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { TagShoppingElement } from './shopping-list.model';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.scss'
})
export class ShoppingListComponent {

  @Input({ required: true }) tagShoppingElements: TagShoppingElement[];
}
