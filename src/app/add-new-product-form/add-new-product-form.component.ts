import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DecimalPipe } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-add-new-product-form',
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
  templateUrl: './add-new-product-form.component.html',
  styleUrl: './add-new-product-form.component.scss',
})
export class AddNewProductFormComponent {

  readonly options = inject(FormBuilder).group({
    name:[''],
    kcal:[''],
    fat:[''],
    carbo:[''],
    fiber:[''],
    protein:[''],
    per100g:[false]
 
  });
  constructor(public dialogRef: MatDialogRef<AddNewProductFormComponent>) {}

  submitForm() {
    if(this.options.valid) {
      this.dialogRef.close(this.options.value);
    }
    
  }
}
