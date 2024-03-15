import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './admin/admin-panel.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: "login",
    pathMatch: 'full'
  },
  
  {
    path: "login",
    title: "Pharmacix | Login",
    component: LoginComponent
  },
  {
    path: "admin",
    title: "Pharmacix | Admin",
    canActivate: [AdminGuard],
    component: AdminComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
