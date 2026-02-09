import { Routes } from '@angular/router';
import { Register } from './Features/auth/components/register/register';
import { Login } from './Features/auth/components/login/login';

export const routes: Routes = [

// {path:'',component:Register},
{path:'',component:Register},
{path:'register',component:Register},
{path:'login',component:Login}


];
