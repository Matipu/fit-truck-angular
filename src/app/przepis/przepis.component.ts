import { Component, inject, OnInit } from '@angular/core';
import { Przepis } from '../przepisy/state/przepisy.model';
import { Nutrients, Produkt } from '../produkty/state/produkty.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../service/product.service';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DecimalPipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { RecipeSelector } from './state/recipe.selector';
import { LoadRecipe } from './state/recipe.action';
import { AddProductComponent } from '../add-product/add-product.component';

export interface ProduktOpis {
  id: string;
  name: string;
  size: number;
  nutrients: Nutrients;
  per100g: boolean;
  multiplier: number;
  inEditMode: boolean;
}

@Component({
  selector: 'app-przepis',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatIconModule, MatButtonModule, DecimalPipe, MatDialogModule, MatFormFieldModule],
  templateUrl: './przepis.component.html',
  styleUrl: './przepis.component.scss',
})
export class PrzepisComponent implements OnInit {

  produkty$: Observable<Produkt[]> = inject(Store).select(RecipeSelector.getProdukty);
  przepis$: Observable<Przepis> = inject(Store).select(RecipeSelector.getPrzepis);
  produkty: Produkt[] = [];
  recipe: Przepis = null;

  productsDescription: ProduktOpis[] = [];

  constructor(private store: Store, private productService: ProductService, public dialog: MatDialog, private route: ActivatedRoute) {
    
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.store.dispatch(new LoadRecipe(params.get('id')));
    });
    
    this.produkty$.subscribe(((data) => {
      this.produkty = data;
      this.przepis$.subscribe(((data) => {
        this.recipe = data;
        this.productsDescription = [];
        if (this.recipe && this.produkty) {
          for (var ingredient of this.recipe.ingredients) {
            var product = this.produkty.find( (element) => element.id == ingredient.id );
            this.productService.obliczKalorycznoscProduktu2(this.recipe, this.produkty)
            if (product) {
              var multiplier = this.productService.getMultiplier(ingredient.size, product.per100g);
              this.productsDescription.push({
                id: ingredient.id,
                name: product.name,
                size: ingredient.size,
                nutrients: product.nutrients,
                per100g: product.per100g,
                multiplier: multiplier,
                inEditMode: false
              });
            }
          }
        }
      }))
    }))
  }

  openEditInput(productDescription: ProduktOpis) {
    productDescription.inEditMode = !productDescription.inEditMode;
  }

  openDialogAddProduct() {
    const dialogRef = this.dialog.open(AddProductComponent, {
      data: this.produkty,
      maxWidth: '100%',
      height: '80%',
      width: '80%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.productsDescription.push({
          id: result.id,
          name: result.name,
          size: result.size,
          nutrients: result.nutrients,
          per100g: result.per100g,
          multiplier: result,
          inEditMode: false
        });
      }
    });
    if(this.recipe) {
      this.recipe.nutrients = this.productService.obliczKalorycznoscProduktu(this.recipe, this.productsDescription);
    }
  }

  changeProductSize($event: number, productDescription: ProduktOpis) {
    productDescription.size = $event;
    productDescription.multiplier = this.productService.getMultiplier(productDescription.size, productDescription.per100g)
    if(this.recipe) {
      this.recipe.nutrients = this.productService.obliczKalorycznoscProduktu(this.recipe, this.productsDescription);
    }
  }
}
