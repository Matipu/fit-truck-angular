export interface Nutrients {
    carbo: number;
    kcal: number;
    fat: number;
    fiber: number;
    protein: number;
}

export interface Produkt {
    id?: string;
    name: string;
    nutrients: Nutrients;
    per100g: boolean;
    tags?: string[];
}
