import { Injectable } from '@angular/core';
import { Przepis } from '../przepisy/state/przepisy.model';
import { Nutrients } from '../produkty/state/produkty.model';

@Injectable({ providedIn: 'root' })
export class DietService {

  obliczKalorycznoscDiety(recipes: Przepis[]): Nutrients {
    var nutrients = {
      carbo: 0,
      kcal: 0,
      fat: 0,
      fiber: 0,
      protein: 0.0,
    };
    for (var recipe of recipes) {
      nutrients.kcal += recipe.nutrients.kcal / recipe.quantity;
      nutrients.carbo += recipe.nutrients.carbo / recipe.quantity;
      nutrients.fat += recipe.nutrients.fat / recipe.quantity;
      nutrients.fiber += recipe.nutrients.fiber / recipe.quantity;
      nutrients.protein += recipe.nutrients.protein / recipe.quantity;
    }
    return nutrients;
  }

}
