import { Component, Input} from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { Nutrients } from '../produkty/state/produkty.model';

@Component({
  selector: 'app-nutrients-table',
  standalone: true,
  imports: [CommonModule, DecimalPipe],
  templateUrl: './nutrients-table.component.html',
  styleUrl: './nutrients-table.component.scss'
})
export class NutrientsTableComponent {

  @Input({ required: true }) nutrients: Nutrients;
  @Input() quantity: number;
}
