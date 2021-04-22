import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { ExpertDetailsPageComponent } from './pages/expert-details-page/expert-details-page.component';
import { ExpertPageComponent } from './pages/expert-page/expert-page.component';

import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NewExpertPageComponent } from './pages/new-expert-page/new-expert-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
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
    canActivate: [AuthGuard],
  },
  {
    path: 'expertos/:id', // http:localhost:4200/todos
    component: ExpertDetailsPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'etiquetas', // http:localhost:4200/todos/1
    component: TagsPageComponent,
    canActivate: [AuthGuard],
  }
  ,
  {
    path: 'addexperto', // http:localhost:4200/todos/1
    component: NewExpertPageComponent,
    canActivate: [AuthGuard],
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
