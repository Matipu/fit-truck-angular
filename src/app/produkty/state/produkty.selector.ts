import { Selector } from "@ngxs/store";
import { ProduktyState, ProduktyStateModel } from "./produkty.state";
import { Produkt } from "./produkty.model";

export class ProduktySelector {
    @Selector([ProduktyState])
    static getProdukty(state: ProduktyStateModel): Produkt[] {
        return state.produkty;
    }
}