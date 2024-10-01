import { Selector } from "@ngxs/store";
import { DietState, DietStateModel } from "./diet.state";
import { Produkt } from "../../produkty/state/produkty.model";
import { Przepis } from "../../przepisy/state/przepisy.model";
import { AllDietsModel } from "./diet.model";


export class DietSelector {
    @Selector([DietState])
    static getProdukty(state: DietStateModel): Produkt[] {
        return state.produkty;
    }

    @Selector([DietState])
    static getPrzepisy(state: DietStateModel): Przepis[] {
        return state.przepisy;
    }

    @Selector([DietState])
    static getDiets(state: DietStateModel): AllDietsModel {
        return state.diets;
    }
}