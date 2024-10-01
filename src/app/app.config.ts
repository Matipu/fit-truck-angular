import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngxs/store';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ProduktyState } from './produkty/state/produkty.state';
import { provideHttpClient } from '@angular/common/http';
import { PrzepisyState } from './przepisy/state/przepisy.state';
import { DietState } from './dieta/state/diet.state';
import { RecipeState } from './przepis/state/recipe.state';
import { UserState } from './user/state/user.state';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideHttpClient(), provideRouter(routes), provideStore([ProduktyState, PrzepisyState, DietState, RecipeState, UserState],
), provideAnimationsAsync()]
};
