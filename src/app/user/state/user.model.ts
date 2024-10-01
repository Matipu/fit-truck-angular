import { Nutrients } from "../../produkty/state/produkty.model";

export interface UserModel {
    id: number;
    name: string;
    yearOfBirth: number;
    height: number;
    weight: number;
    PAL: number;
    sex: string;
}

export interface User {
    id: number;
    name: string;
    yearOfBirth: number;
    height: number;
    weight: number;
    PAL: number;
    sex: string;
    requiredNutrients: Nutrients;
}
