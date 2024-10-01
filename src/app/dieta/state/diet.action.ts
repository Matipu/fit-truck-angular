import { AllDietsModel } from "./diet.model";

export const stateName = 'diet';
const prefix = '[' + stateName + ']';

export class LoadPrzepisy {
    static readonly type = prefix + ' LoadRecipes';
}

export class LoadDiets {
    static readonly type = prefix + ' LoadDiets';

    constructor(public id: number) {
        
    }
}

export class SaveDiets {
    static readonly type = prefix + ' SaveDiets';

    constructor(public allDietsModel: AllDietsModel) {
        
    }
}