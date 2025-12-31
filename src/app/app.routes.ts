import { Routes } from '@angular/router';
import { Breeds } from './views/breeds/breeds';
import { Home } from './views/home/home';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "home",
        pathMatch: "full",
    },
    {
        path: "home",
        component: Home,
    },
    {
        path: "breeds",
        component: Breeds,
    },
];
