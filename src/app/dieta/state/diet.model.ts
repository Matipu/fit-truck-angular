import { Nutrients } from "../../produkty/state/produkty.model";
import { Przepis } from "../../przepisy/state/przepisy.model";

export interface Diet {
    recipes: Przepis[];
    nutrients: Nutrients;
}

export interface RecipeWithNumbersInDiet {
    recipe: Przepis;
    numbersInDiet: number;
}

export interface AllDiets {
    allDayDietsFirstPerson: Diet[];
    allDayDietsSecondPerson: Diet[];
}

export interface DietsModel {
    recipesId: number[];
}

export interface AllDietsModel {
    id: 1;
    allDayDietsFirstPerson: DietsModel[];
    allDayDietsSecondPerson: DietsModel[];
}
