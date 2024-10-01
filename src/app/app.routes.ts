import { Routes } from '@angular/router';
import {ProduktyComponent} from './produkty/produkty.component';
import {PrzepisyComponent} from './przepisy/przepisy.component';
import { DietComponent } from './dieta/diet.component';
import { PrzepisComponent } from './przepis/przepis.component';

export const routes: Routes = [
    { path: 'produkty', component: ProduktyComponent },
    { path: 'przepisy', component: PrzepisyComponent },
    { path: 'diet', component: DietComponent },
    { path: 'recipe/:id', component: PrzepisComponent },
];
