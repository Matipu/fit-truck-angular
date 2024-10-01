export interface ShoppingListElement {
    ingredientId: string;
    name: string;
    size: number;
    culinaryConversion: string;
}

export interface TagShoppingElement {
    tagName: string;
    listElement: ShoppingListElement[];
}