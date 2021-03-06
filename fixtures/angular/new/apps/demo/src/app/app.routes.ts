import {
  Routes,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AccountPageRoutes } from './components/pages/account-page/account-page.routes';
import { AdminPageRoutes } from './components/pages/admin-page/admin-page.routes';
import { EntitiesPageRoutes } from './components/pages/entities-page/entities-page.routes';
import { HomePageRoutes } from './components/pages/home-page/home-page.routes';
import { ThemesPageRoutes } from './components/pages/themes-page/themes-page.routes';
import { OauthGuard } from '@rucken/core';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren:
      './components/pages/home-page/home-page.module#HomePageModule',
    data: HomePageRoutes[0].data
  },
  {
    path: 'entities',
    loadChildren:
      './components/pages/entities-page/entities-page.module#EntitiesPageModule',
    data: EntitiesPageRoutes[0].data
  },
  {
    path: 'themes',
    loadChildren:
      './components/pages/themes-page/themes-page.module#ThemesPageModule',
    data: ThemesPageRoutes[0].data
  },
  {
    path: 'account',
    loadChildren:
      './components/pages/account-page/account-page.module#AccountPageModule',
    data: AccountPageRoutes[0].data
  },
  {
    path: 'admin',
    loadChildren:
      './components/pages/admin-page/admin-page.module#AdminPageModule',
    data: AdminPageRoutes[0].data
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
