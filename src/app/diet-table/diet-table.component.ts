import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Przepis } from '../przepisy/state/przepisy.model';
import { Nutrients, Produkt } from '../produkty/state/produkty.model';
import { ProductService } from '../service/product.service';
import { Store } from '@ngxs/store';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DecimalPipe } from '@angular/common';
import { DietService } from '../service/diet.service';

@Component({
  selector: 'app-diet-table',
  standalone: true,
  imports: [MatFormFieldModule, MatTableModule, MatInputModule, MatIconModule, MatButtonModule, DecimalPipe, MatDialogModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './diet-table.component.html',
  styleUrl: './diet-table.component.scss'
})
export class DietTableComponent implements OnInit, OnChanges {

  @Input({ required: true }) przepisy: Przepis[];
  @Output() deleteRecipe = new EventEmitter<Przepis>();

  recipesRows: MatTableDataSource<Przepis>;

  dietPrzepisyDisplayedColumns: string[] = ['name', 'kcal', 'carbo', 'fat', 'fiber', 'protein', 'actions'];

  constructor(private store: Store, public dialog: MatDialog) {  
    this.recipesRows = new MatTableDataSource();
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['przepisy']){
      this.recipesRows.data = changes['przepisy'].currentValue;
    }
  }
}
