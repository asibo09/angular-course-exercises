import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'shop', loadComponent:() => import('./features/shop/shop') },
    { path: 'cart', loadComponent: () => import('./features/cart/cart')},
    { path: 'counter', loadComponent: () => import('./features/counter/counter')},
    {path: '', redirectTo: 'shop', pathMatch: 'full'}
];
