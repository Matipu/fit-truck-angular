import { Action, State, StateContext } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produkt } from '../../produkty/state/produkty.model';
import { LoadDiets, LoadPrzepisy, SaveDiets } from './diet.action';
import { Przepis } from '../../przepisy/state/przepisy.model';
import { AllDietsModel } from './diet.model';

export interface DietStateModel {
  przepisy: Przepis[];
  produkty: Produkt[];
  diets: AllDietsModel;
}

@Injectable({
  providedIn: 'root',
})
@State<DietStateModel>({
  name: 'diet',
  defaults: {
    przepisy: [],
    produkty: [],
    diets: null
  },
})
export class DietState {
  constructor(private http: HttpClient) {}

  @Action(LoadPrzepisy)
  loadPrzepisy(ctx: StateContext<DietStateModel>): void {

    this.http
    .get<Produkt[]>('http://192.168.0.73:3000/products')
    .subscribe((data) => {
      ctx.setState(
        patch({
          produkty: data
        })
      );


      this.http
      .get<Przepis[]>('http://192.168.0.73:3000/recipes')
      .subscribe((data) => {
        ctx.setState(
          patch({
            przepisy: data
          })
        );
      });
    });
  }

  @Action(LoadDiets)
  loadDiets(ctx: StateContext<DietStateModel>, model: LoadDiets): void {
    this.http
    .get<AllDietsModel>('http://192.168.0.73:3000/diet/' + model.id)
    .subscribe((data) => {
      ctx.setState(
        patch({
          diets: data
        })
      );
    });
  }


  @Action(SaveDiets)
  saveDiets(ctx: StateContext<DietStateModel>, model: SaveDiets): void {
    this.http
      .put<Produkt[]>('http://192.168.0.73:3000/diet/' + model.allDietsModel.id, model.allDietsModel)
      .subscribe(() => {

    });
  }
}
