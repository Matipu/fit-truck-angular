import { Action, State, StateContext } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produkt } from '../../produkty/state/produkty.model';
import { LoadUsers, SaveUser } from './user.action';
import { UserModel } from './user.model';

export interface UserStateModel {
  users: UserModel[];
}

@Injectable({
  providedIn: 'root',
})
@State<UserStateModel>({
  name: 'user',
  defaults: {
    users: null,
  },
})
export class UserState {
  constructor(private http: HttpClient) {}

  @Action(LoadUsers)
  loadPrzepisy(ctx: StateContext<UserStateModel>): void {

    this.http
    .get<UserModel[]>('http://192.168.0.73:3000/user')
    .subscribe((data) => {
      ctx.setState(
        patch({
          users: data
        })
      );
    });
  }

  @Action(SaveUser)
  saveDiets(ctx: StateContext<UserStateModel>, model: SaveUser): void {
    this.http
      .put<Produkt[]>('http://192.168.0.73:3000/user/' + model.user.id, model.user);
  }
}
