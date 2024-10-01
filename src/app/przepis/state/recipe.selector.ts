import { Selector } from "@ngxs/store";
import { PrzepisStateModel, RecipeState } from "./recipe.state";
import { Produkt } from "../../produkty/state/produkty.model";
import { Przepis } from "../../przepisy/state/przepisy.model";

export class RecipeSelector {
    @Selector([RecipeState])
    static getProdukty(state: PrzepisStateModel): Produkt[] {
        return state.produkty;
    }

    @Selector([RecipeState])
    static getPrzepis(state: PrzepisStateModel): Przepis {
        return state.przepis;
    }
}