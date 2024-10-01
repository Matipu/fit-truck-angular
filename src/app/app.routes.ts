import { Routes } from '@angular/router';
import {ProduktyComponent} from './produkty/produkty.component';
import {PrzepisyComponent} from './przepisy/przepisy.component';
import { DietComponent } from './dieta/diet.component';
import { PrzepisComponent } from './przepis/przepis.component';
import { UserComponent } from './user/user.component';

export const routes: Routes = [
    { path: 'produkty', component: ProduktyComponent },
    { path: 'przepisy', component: PrzepisyComponent },
    { path: 'diet', component: DietComponent },
    { path: 'recipe/:id', component: PrzepisComponent },
    { path: 'user', component: UserComponent },
];
