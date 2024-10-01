import { Nutrients } from "../../produkty/state/produkty.model";

export interface Ingredient {
    id: string;
    size: number;
}

export interface Step {
    desc: string;
}

export interface Przepis {
    id: number;
    name: string;
    quantity: number;
    ingredients: Ingredient[];
    steps: Step[];
    nutrients: Nutrients;
}