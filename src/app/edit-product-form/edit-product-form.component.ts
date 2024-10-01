import { Component, Inject, inject, Input, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DecimalPipe } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { Produkt } from '../produkty/state/produkty.model';

@Component({
  selector: 'app-edit-product-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    DecimalPipe,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatCheckboxModule
  ],
  templateUrl: './edit-product-form.component.html',
  styleUrl: './edit-product-form.component.scss',
})
export class EditNewProductFormComponent {

  readonly options = inject(FormBuilder).group({
    name:[''],
    kcal:[''],
    fat:[''],
    carbo:[''],
    fiber:[''],
    protein:[''],
    per100g:[false]
  });

  constructor(public dialogRef: MatDialogRef<EditNewProductFormComponent>, @Inject(MAT_DIALOG_DATA) public product: Produkt) {
    this.options = inject(FormBuilder).group({
      name:[this.product.name],
      kcal:[this.product.nutrients.kcal.toString()],
      fat:[this.product.nutrients.fat.toString()],
      carbo:[this.product.nutrients.carbo.toString()],
      fiber:[this.product.nutrients.fiber.toString()],
      protein:[this.product.nutrients.protein.toString()],
      per100g:[this.product.per100g]
    });
  }


  submitForm() {
    if(this.options.valid) {
      this.dialogRef.close(
      {
        id: this.product.id,
        name: this.options.value.name,
        per100g: this.options.value.per100g,
        nutrients: {
          carbo: this.options.value.carbo,
          kcal: this.options.value.kcal,
          fat: this.options.value.fat,
          fiber: this.options.value.fiber,
          protein: this.options.value.protein,
        }
      });
    }
    
  }
}
