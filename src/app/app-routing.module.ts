import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpertDetailsPageComponent } from './pages/expert-details-page/expert-details-page.component';
import { ExpertPageComponent } from './pages/expert-page/expert-page.component';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { TagDetailsPageComponent } from './pages/tag-details-page/tag-details-page.component';
import { TagsPageComponent } from './pages/tags-page/tags-page.component';

const routes: Routes = [
  {
    path: '', // http:localhost:4200/
    pathMatch: 'full',
    redirectTo: '/login'
  }
  ,
  {
    path: 'login', // http:localhost:4200/login
    component: LoginPageComponent
  },
  {
    path: 'registro', // http:localhost:4200/login
    component: RegisterPageComponent
  },
  {
    path: 'expertos', // http:localhost:4200/todos
    component: ExpertPageComponent,
    //canActivate: [GuardGuard],
  },
  {
    path: 'expertos/:id', // http:localhost:4200/todos
    component: ExpertDetailsPageComponent,
    //canActivate: [GuardGuard],
  },
  {
    path: 'etiquetas/:id', // http:localhost:4200/todos
    component: TagDetailsPageComponent,
    //canActivate: [GuardGuard],
  },
  {
    path: 'etiquetas', // http:localhost:4200/todos/1
    component: TagsPageComponent,
    //canActivate: [GuardGuard],
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  }




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
