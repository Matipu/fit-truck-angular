import { Action, State, StateContext } from '@ngxs/store';
import { LoadRecipe } from './recipe.action';
import { patch } from '@ngxs/store/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produkt } from '../../produkty/state/produkty.model';
import { Przepis } from '../../przepisy/state/przepisy.model';

export interface PrzepisStateModel {
  przepis: Przepis;
  produkty: Produkt[];
}

@Injectable({
  providedIn: 'root',
})
@State<PrzepisStateModel>({
  name: 'przepis',
  defaults: {
    przepis: null,
    produkty: []
  },
})
export class RecipeState {
  constructor(private http: HttpClient) {}

  @Action(LoadRecipe)
  loadRecipe(ctx: StateContext<PrzepisStateModel>, model: LoadRecipe): void {
    this.http
    .get<Produkt[]>('http://192.168.0.73:3000/products')
    .subscribe((produkty) => {
      this.http
      .get<Przepis>('http://192.168.0.73:3000/recipes/' + model.recipeId)
      .subscribe((przepis) => {
        ctx.setState(
          patch({
            produkty: produkty,
            przepis: przepis
          })
        );
      });
    });
  }
}
