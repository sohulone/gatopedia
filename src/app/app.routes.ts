import { Routes } from '@angular/router';
import { Breeds } from './views/breeds/breeds';
import { Home } from './views/home/home';
import { Login } from './views/login/login';
import { Register } from './views/register/register';
import { authGuard, loginGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "login",
        pathMatch: "full",
    },
    {
        path: "login",
        component: Login,
        canActivate: [loginGuard],
    },
    {
        path: "register",
        component: Register,
        canActivate: [loginGuard],
    },
    {
        path: "home",
        component: Home,
        canActivate: [authGuard],
    },
    {
        path: "breeds",
        component: Breeds,
        canActivate: [authGuard],
    },
];
