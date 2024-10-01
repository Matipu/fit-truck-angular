import { Component, inject, OnInit } from '@angular/core';
import { Przepis } from '../przepisy/state/przepisy.model';
import { Produkt } from '../produkty/state/produkty.model';
import { Observable } from 'rxjs';
import { ProductService } from '../service/product.service';
import { Store } from '@ngxs/store';
import { DietSelector } from './state/diet.selector';
import { LoadDiets, LoadPrzepisy, SaveDiets } from './state/diet.action';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, DecimalPipe } from '@angular/common';
import { DietService } from '../service/diet.service';
import { AddPrzepisComponent } from '../add-przepis/add-przepis.component';
import { DietTableComponent } from '../diet-table/diet-table.component';
import { AllDiets, AllDietsModel, Diet, DietsModel, RecipeWithNumbersInDiet } from './state/diet.model';
import { ShoppingListComponent } from '../shopping-list/shopping-list.component';
import { TagShoppingElement } from '../shopping-list/shopping-list.model';

@Component({
  selector: 'app-dieta',
  standalone: true,
  imports: [MatFormFieldModule, MatTableModule, MatInputModule, MatIconModule, MatButtonModule, DecimalPipe, MatDialogModule, DietTableComponent, ShoppingListComponent, CommonModule],
  templateUrl: './diet.component.html',
  styleUrl: './diet.component.scss'
})
export class DietComponent implements OnInit {


  produkty$: Observable<Produkt[]> = inject(Store).select(DietSelector.getProdukty);
  przepisy$: Observable<Przepis[]> = inject(Store).select(DietSelector.getPrzepisy);
  allDietsModel$: Observable<AllDietsModel> = inject(Store).select(DietSelector.getDiets);

  products: Produkt[] = [];
  przepisy: Przepis[] = [];

  requiredProducts: TagShoppingElement[];
  recipeWithNumbersInDiet: RecipeWithNumbersInDiet[];

  emptyDiet: Diet= {
    recipes: [], 
    nutrients:{
      carbo: 0,
      kcal: 0,
      fat: 0,
      fiber: 0,
      protein: 0.0,
    }
  };

  allDiets: AllDiets = {
    allDayDietsFirstPerson: [],
    allDayDietsSecondPerson: []
  }


  constructor(private store: Store, private productService: ProductService,  private dietService: DietService, public dialog: MatDialog) {  

  }

  ngOnInit(): void {
    this.store.dispatch(new LoadPrzepisy());
    this.produkty$.subscribe(((data) => {
      if(data.length == 0) {
        return;
      }
      this.products = data;

      this.przepisy$.subscribe(((data) => {
        if(data.length == 0) {
          return;
        }

        this.przepisy = data;
        this.obliczKalorycznoscProduktow(data, this.products);
        this.store.dispatch(new LoadDiets(1));
      }))
    }))
    this.allDietsModel$.subscribe((diets) => 
      {
        if(diets == null) {
          return;
        }
        this.allDiets = {
          allDayDietsFirstPerson: [],
          allDayDietsSecondPerson: []
        }
        
        diets.allDayDietsFirstPerson.forEach((dietsModel) => {
          var recipes: Przepis[] = [];
          dietsModel.recipesId.forEach((recipeId) => {
            var recipe: Przepis = this.przepisy.find((przepis) => recipeId == przepis.id);
            recipes.push(recipe);
          })
  
          var diet: Diet = {
            recipes: recipes, 
            nutrients:{
              carbo: 0,
              kcal: 0,
              fat: 0,
              fiber: 0,
              protein: 0.0,
            }
          };
  
          this.allDiets.allDayDietsFirstPerson.push(diet);
          this.updateRecipes(diet);
        })
  
        diets.allDayDietsSecondPerson.forEach((dietsModel) => {
          var recipes: Przepis[] = [];
          dietsModel.recipesId.forEach((recipeId) => {
            var recipe: Przepis = this.przepisy.find((przepis) => recipeId == przepis.id);
            recipes.push(recipe);
          })
  
          var diet: Diet = {
            recipes: recipes, 
            nutrients:{
              carbo: 0,
              kcal: 0,
              fat: 0,
              fiber: 0,
              protein: 0.0,
            }
          };
  
          this.allDiets.allDayDietsSecondPerson.push(diet);
          this.updateRecipes(diet);
        })
        
      });

  }

  deleteRecipe(diet: Diet, row: Przepis): void {
    const data = diet.recipes;
    diet.recipes = data.filter(obj => {return obj !== row});
    this.updateRecipes(diet);
  }

  obliczKalorycznoscProduktow(recipes: Przepis[], products: Produkt[]): void{
    if(recipes === null || products === null) {
        return;
    }

    for (var recipe of  recipes) {
      this.productService.obliczKalorycznoscProduktu2(recipe, products);
    };
  };

  openDialog(diet: Diet) {
    const dialogRef = this.dialog.open(AddPrzepisComponent, {
      data: this.przepisy,
      maxWidth: '100%',
      width: '80%',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        diet.recipes.push(result);
        this.updateRecipes(diet);
      }
    });
  }

  saveDiet() {
    var allDietsModel: AllDietsModel = {
      id: 1,
      allDayDietsFirstPerson: [],
      allDayDietsSecondPerson: []
    }
    this.allDiets.allDayDietsFirstPerson.forEach(diet => {
      var recipesId: number[] = [];
      diet.recipes.forEach((recipe) => {
        recipesId.push(recipe.id);
      })
      var dietModel: DietsModel = { recipesId : recipesId};
      allDietsModel.allDayDietsFirstPerson.push(dietModel);
    })

    this.allDiets.allDayDietsSecondPerson.forEach(diet => {
      var recipesId: number[] = [];
      diet.recipes.forEach((recipe) => {
        recipesId.push(recipe.id);
      })
      var dietModel: DietsModel = { recipesId : recipesId};
      allDietsModel.allDayDietsSecondPerson.push(dietModel);
    })
    this.store.dispatch(new SaveDiets(allDietsModel))
  }

  updateRecipes(diet: Diet) {
    diet.recipes = [].concat(diet.recipes);
    diet.nutrients = this.dietService.obliczKalorycznoscDiety(diet.recipes);


    var allRecipes: Przepis[] = []
    allRecipes.push(...this.allDiets.allDayDietsFirstPerson.flatMap(diet => diet.recipes))
    allRecipes.push(...this.allDiets.allDayDietsSecondPerson.flatMap(diet => diet.recipes))
    this.recipeWithNumbersInDiet = this.getRecipeWithNumbersInDiet(allRecipes);
    this.requiredProducts = this.getUniqueIngredients(this.recipeWithNumbersInDiet);
  }

  private getRecipeWithNumbersInDiet(recipes: Przepis[]): RecipeWithNumbersInDiet[] {
    var recipesWithNumbersInDiet: RecipeWithNumbersInDiet[] = [];
    recipes.forEach(recipe => {
      var findedRecipe = recipesWithNumbersInDiet.find(element => element.recipe.id == recipe.id)
      if(findedRecipe == null) {
        recipesWithNumbersInDiet.push({
          recipe: recipe,
          numbersInDiet: 1
        })
      } else {
        findedRecipe.numbersInDiet++;
      }
    })
    return recipesWithNumbersInDiet;
  }

  private getUniqueIngredients(recipes: RecipeWithNumbersInDiet[]): TagShoppingElement[] {
    var tagShoppingElements: TagShoppingElement[] = [{tagName: "Pozostałe",
      listElement: []
    }];
    recipes.forEach(recipe => {
      this.updateTagForRecipe(recipe, tagShoppingElements);
    })

    //zamiana ostatniego i pierwszego z listy zakupów
    let temp = tagShoppingElements[0];
    tagShoppingElements[0] = tagShoppingElements[tagShoppingElements.length - 1];
    tagShoppingElements[tagShoppingElements.length - 1] = temp;
    
    if(tagShoppingElements[tagShoppingElements.length - 1].listElement.length == 0) {
      tagShoppingElements.pop();
    }
    return tagShoppingElements;
  }

  //Tworzenie listy zakupów
  private updateTagForRecipe(recipeWithNumbersInDiet: RecipeWithNumbersInDiet, tagShoppingElements: TagShoppingElement[]) {
    recipeWithNumbersInDiet.recipe.ingredients.forEach(ingredient => {
      var findedIngridient = tagShoppingElements.flatMap(element => element.listElement).find((element) => element.ingredientId == ingredient.id);
      if (findedIngridient == null) {
        var product = this.products.find((element) => element.id == ingredient.id);
        var tagShoppingElement = tagShoppingElements[0];
        if(product.tags) {
          var findedTagElement = tagShoppingElements.find((tag) => tag.tagName == product.tags[0])
          if(findedTagElement == null) {
            tagShoppingElements.push({
              tagName: product.tags[0],
              listElement: []
            })
            tagShoppingElement = tagShoppingElements[tagShoppingElements.length - 1]
          } else {
            tagShoppingElement = findedTagElement;
          }
        }
        tagShoppingElement.listElement.push({
          ingredientId: ingredient.id,
          name: product.name,
          size: (ingredient.size / recipeWithNumbersInDiet.recipe.quantity) * recipeWithNumbersInDiet.numbersInDiet,
          culinaryConversion: (product.per100g ? 'g' : 'szt')
        });
      } else {
        findedIngridient.size = findedIngridient.size + (ingredient.size / recipeWithNumbersInDiet.recipe.quantity) * recipeWithNumbersInDiet.numbersInDiet;
      }
    });
  }
}