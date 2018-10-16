import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoComponent } from './todo/todo.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { patch } from 'webdriver-js-extender';

export const router: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path:'login', component:LoginComponent},
  { path:'todo', component:TodoComponent},
  { path:'register', component:RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(router)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
