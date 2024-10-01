import { Action, State, StateContext } from '@ngxs/store';
import { Produkt } from './produkty.model';
import { DeleteProduct, EditProduct, LoadProdukty, SaveProdukt } from './produkty.action';
import { patch } from '@ngxs/store/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface ProduktyStateModel {
  produkty: Produkt[];
}

@Injectable({
  providedIn: 'root',
})
@State<ProduktyStateModel>({
  name: 'produkty',
  defaults: {
    produkty: [],
  },
})
export class ProduktyState {
  constructor(private http: HttpClient) {}

  @Action(LoadProdukty)
  loadProdukty(ctx: StateContext<ProduktyStateModel>) {
    this.http
      .get<Produkt[]>('http://192.168.0.73:3000/products')
      .subscribe((data) => {
        ctx.setState(
          patch({
            produkty: data
          })
        );
      });
  }

  @Action(SaveProdukt)
  saveProduct(ctx: StateContext<ProduktyStateModel>, saveProduct: SaveProdukt): void {
    this.http
      .post<Produkt[]>('http://192.168.0.73:3000/products', saveProduct.produkt)
      .subscribe(() => {
        this.loadProdukty(ctx);
      });
  }

  @Action(EditProduct)
  editProduct(ctx: StateContext<ProduktyStateModel>, model: EditProduct): void {
    this.http
      .put<Produkt[]>('http://192.168.0.73:3000/products/' + model.produkt.id, model.produkt)
      .subscribe(() => {
        this.loadProdukty(ctx);
      });
  }

  @Action(DeleteProduct)
  deleteProduct(ctx: StateContext<ProduktyStateModel>, model: DeleteProduct): void {
    this.http
      .delete<Produkt[]>('http://192.168.0.73:3000/products/' + model.produktId)
      .subscribe(() => {
        this.loadProdukty(ctx);
      });
  }
}
