import { Action, State, StateContext } from '@ngxs/store';
import { LoadPrzepisy } from './przepisy.action';
import { patch } from '@ngxs/store/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produkt } from '../../produkty/state/produkty.model';
import { Przepis } from './przepisy.model';

export interface PrzepisyStateModel {
  przepisy: Przepis[];
  produkty: Produkt[];
}

@Injectable({
  providedIn: 'root',
})
@State<PrzepisyStateModel>({
  name: 'przepisy',
  defaults: {
    przepisy: [],
    produkty: []
  },
})
export class PrzepisyState {
  constructor(private http: HttpClient) {}

  @Action(LoadPrzepisy)
  loadPrzepisy(ctx: StateContext<PrzepisyStateModel>): void {
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
}
