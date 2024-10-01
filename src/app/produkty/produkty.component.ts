import { Component, importProvidersFrom, inject, OnInit } from '@angular/core';
import { ProduktySelector } from './state/produkty.selector';
import { Observable } from 'rxjs';
import { Produkt } from './state/produkty.model';
import { Store } from '@ngxs/store';
import {MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { DeleteProduct, EditProduct, LoadProdukty, SaveProdukt } from './state/produkty.action';
import { AddNewProductFormComponent } from '../add-new-product-form/add-new-product-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { EditNewProductFormComponent } from '../edit-product-form/edit-product-form.component';

@Component({
  selector: 'app-produkty',
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatTableModule, 
    MatInputModule,
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  
  templateUrl: './produkty.component.html',
  styleUrl: './produkty.component.scss'
})
export class ProduktyComponent implements OnInit {

  constructor(private store: Store, public newDialog: MatDialog, public editDialog: MatDialog) {
    
  }

  addProductOpenDialog() {
    const newDialogRef = this.newDialog.open(AddNewProductFormComponent, {
      maxWidth: '100%',
      width: '30%',
      maxHeight: '100%',
    });


    newDialogRef.afterClosed().subscribe(result => {
      if(result){
        this.store.dispatch(new SaveProdukt(        
          {
            name: result.name,
            per100g: result.per100g,
            nutrients: {
              carbo: result.carbo,
              kcal: result.kcal,
              fat: result.fat,
              fiber: result.fiber,
              protein: result.protein,
            }
          }
        ));
      }
    });
  }

  editProductOpenDialog(product: Produkt) {
    const editDialogRef = this.editDialog.open(EditNewProductFormComponent, {
      data: product,
      maxWidth: '100%',
      width: '30%',
      maxHeight: '100%',
    });

    editDialogRef.afterClosed().subscribe(result => {
      if(result){
        this.store.dispatch(new EditProduct(result));
      }
    });
  }

  deleteProduct(product: Produkt) {
    this.store.dispatch(new DeleteProduct(product.id))
  }

  produkty$: Observable<Produkt[]> = inject(Store).select(ProduktySelector.getProdukty);


  displayedColumns: string[] = ['id', 'name', 'kcal', 'carbo', 'fat', 'fiber', 'protein', 'per100g', 'action'];

  ngOnInit(): void {
    this.store.dispatch(new LoadProdukty());
  }
}
