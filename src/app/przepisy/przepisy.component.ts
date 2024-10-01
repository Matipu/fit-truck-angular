import { Component, inject, OnInit } from '@angular/core';
import { PrzepisySelector } from './state/przepisy.selector';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import {MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { LoadPrzepisy } from './state/przepisy.action';
import { Produkt } from '../produkty/state/produkty.model';
import { Przepis } from './state/przepisy.model';
import { PrzepisComponent } from '../przepis/przepis.component';
import { ProductService } from '../service/product.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-przepisy',
  standalone: true,
  imports: [
    MatTableModule, 
    CommonModule,
    MatIconModule,
    MatButtonModule,
    RouterOutlet, RouterLink, RouterLinkActive
  ],
  
  templateUrl: './przepisy.component.html',
  styleUrl: './przepisy.component.scss'
})
export class PrzepisyComponent implements OnInit {

  produkty$: Observable<Produkt[]> = inject(Store).select(PrzepisySelector.getProdukty);
  przepisy$: Observable<Przepis[]> = inject(Store).select(PrzepisySelector.getPrzepisy);
  produkty: Produkt[] = [];

  displayedColumns: string[] = ['id', 'name','quantity', 'kcal', 'carbo', 'fat', 'fiber', 'protein', 'action'];

  constructor(private store: Store, private productService: ProductService) {  
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadPrzepisy());

    this.produkty$.subscribe(((data) => {
      this.produkty = data;
    }))

    this.przepisy$.subscribe(((data) => {
      this.obliczKalorycznosc(data, this.produkty);
    }))
  }

  deleteReceipe(recipe: Przepis){

  }

  obliczKalorycznosc(recipes: Przepis[], products: Produkt[]): void{
    if(recipes === null || products === null) {
        return;
    }

    for (var recipe of  recipes) {
      this.productService.obliczKalorycznoscProduktu2(recipe, products);
    };
  };
}
