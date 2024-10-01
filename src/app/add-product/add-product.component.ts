import { Component, Inject, inject, OnInit } from '@angular/core';
import { Przepis } from '../przepisy/state/przepisy.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DecimalPipe } from '@angular/common';
import { Produkt } from '../produkty/state/produkty.model';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [MatFormFieldModule, MatTableModule, MatInputModule, MatIconModule, MatButtonModule, DecimalPipe, MatDialogModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit {

  allProductsDisplayedColumns: string[] = ['name', 'kcal', 'carbo', 'fat', 'fiber', 'protein', 'actions'];
  allReceipesDataSource: MatTableDataSource<Produkt>;

  constructor(public dialogRef: MatDialogRef<AddProductComponent>, @Inject(MAT_DIALOG_DATA) public data: Produkt[]) {
    this.allReceipesDataSource = new MatTableDataSource(data);
  }

  ngOnInit() {

  }

  applyFilter(filterValue: string) {
    this.allReceipesDataSource.filter = filterValue.trim().toLowerCase();
  }

  addRecipe(row: Produkt): void {
    this.dialogRef.close(row);
  }
}
