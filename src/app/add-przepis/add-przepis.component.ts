import { Component, Inject, inject, OnInit } from '@angular/core';
import { Przepis } from '../przepisy/state/przepisy.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [MatFormFieldModule, MatTableModule, MatInputModule, MatIconModule, MatButtonModule, DecimalPipe, MatDialogModule],
  templateUrl: './add-przepis.component.html',
  styleUrl: './add-przepis.component.scss'
})
export class AddPrzepisComponent implements OnInit {

  allPrzepisyDisplayedColumns: string[] = ['name','quantity', 'kcal', 'carbo', 'fat', 'fiber', 'protein', 'actions'];
  allReceipesDataSource: MatTableDataSource<Przepis>;

  constructor(public dialogRef: MatDialogRef<AddPrzepisComponent>, @Inject(MAT_DIALOG_DATA) public data: Przepis[]) {
    this.allReceipesDataSource = new MatTableDataSource(data);
  }

  ngOnInit() {

  }
  

  applyFilter(filterValue: string) {
    this.allReceipesDataSource.filter = filterValue.trim().toLowerCase();
  }

  addRecipe(row: Przepis): void {
    this.dialogRef.close(row);
  }
}
