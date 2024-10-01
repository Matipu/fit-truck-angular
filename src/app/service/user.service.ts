import { Injectable } from '@angular/core';
import { User, UserModel } from '../user/state/user.model';
import { Nutrients } from '../produkty/state/produkty.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  convertModelToUser(userModel: UserModel): User{
    return {...userModel,
      requiredNutrients: this.calculateRequiredNutrients(userModel)
    } 
  }

  calculateRequiredNutrients(userModel: UserModel): Nutrients {
    var age = new Date().getFullYear() - userModel.yearOfBirth
    var reqKcal: number;
    if(userModel.sex == 'w') {
      reqKcal = (655.1 + (9.563*userModel.weight) + (1.85*userModel.height) - (4.676 * age)) * userModel.PAL;
    } else {
      reqKcal = (66.5 + (13.75*userModel.weight) + (5.003*userModel.height) - (6.775 * age)) * userModel.PAL;
    }
    return {
      kcal: reqKcal,
      carbo: reqKcal*0.52/4,
      fat: reqKcal*0.31/9,
      fiber: 28,
      protein: reqKcal*0.17/4
    };
  }
}
