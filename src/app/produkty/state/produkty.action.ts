import { Produkt } from "./produkty.model";

export const stateName = 'produkty';
const prefix = '[' + stateName + ']';

export class LoadProdukty {
    static readonly type = '${prefix} Load';
}

export class SaveProdukt {
    static readonly type = '${prefix} Save';

    constructor(public produkt: Produkt) {
        
    }
}

export class EditProduct {
    static readonly type = '${prefix} Edit';

    constructor(public produkt: Produkt) {
        
    }
}

export class DeleteProduct {
    static readonly type = '${prefix} Delete';

    constructor(public produktId: string) {
        
    }
}
