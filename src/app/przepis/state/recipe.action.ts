export const stateName = 'recipe';
const prefix = '[' + stateName + ']';

export class LoadRecipe {
    static readonly type = prefix + ' Load';

    constructor(public recipeId: string) {
        
    }
}
