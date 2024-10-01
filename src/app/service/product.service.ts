import { Injectable } from '@angular/core';
import { Przepis } from '../przepisy/state/przepisy.model';
import { ProduktOpis } from '../przepis/przepis.component';
import { Nutrients, Produkt } from '../produkty/state/produkty.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  obliczKalorycznoscProduktu(
    recipe: Przepis,
    productDesc: ProduktOpis[]
  ): Nutrients {
    this.clearRecipeNutrients(recipe);
    for (var ingredient of productDesc) {
      this.addNutrients(
        ingredient.nutrients,
        ingredient.size,
        ingredient.per100g,
        recipe
      );
    }
    return recipe.nutrients;
  }

  obliczKalorycznoscProduktu2(recipe: Przepis, products: Produkt[]): void {
    this.clearRecipeNutrients(recipe);
    for (var ingredient of recipe.ingredients) {
      var product = products.find((element) => element.id == ingredient.id);
      if (product == null) {
        continue;
      }
      this.addNutrients(
        product.nutrients,
        ingredient.size,
        product.per100g,
        recipe
      );
    }
  }

  private clearRecipeNutrients(recipe: Przepis) {
    recipe.nutrients = {
      carbo: 0,
      kcal: 0,
      fat: 0,
      fiber: 0,
      protein: 0.0,
    };
  }

  private addNutrients(
    nutrients: Nutrients,
    size: number,
    per100g: boolean,
    recipe: Przepis
  ) {
    var multiplier = this.getMultiplier(size, per100g);
    recipe.nutrients.carbo += nutrients.carbo * multiplier;
    recipe.nutrients.kcal += nutrients.kcal * multiplier;
    recipe.nutrients.fat += nutrients.fat * multiplier;
    recipe.nutrients.fiber += nutrients.fiber * multiplier;
    recipe.nutrients.protein += nutrients.protein * multiplier;
  }

  getMultiplier(size: number, per100g: boolean): number {
    var multiplier: number;
    if (per100g) {
      multiplier = size / 100.0;
    } else {
      multiplier = size;
    }
    return multiplier;
  }
}
