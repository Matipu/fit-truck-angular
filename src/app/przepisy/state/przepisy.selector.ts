import { Selector } from "@ngxs/store";
import { PrzepisyState, PrzepisyStateModel } from "./przepisy.state";
import { Produkt } from "../../produkty/state/produkty.model";
import { Przepis } from "./przepisy.model";

export class PrzepisySelector {
    @Selector([PrzepisyState])
    static getProdukty(state: PrzepisyStateModel): Produkt[] {
        return state.produkty;
    }

    @Selector([PrzepisyState])
    static getPrzepisy(state: PrzepisyStateModel): Przepis[] {
        return state.przepisy;
    }
}