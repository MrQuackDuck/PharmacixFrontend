import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoadingComponent } from './loading/loading.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { AdminManageMedicinesTabComponent } from './admin-manage-medicines-tab/admin-manage-medicines-tab.component';
import { AdminManageMedicamentCategoriesTabComponent } from './admin-manage-medicament-categories-tab/admin-manage-medicament-categories-tab.component';
import { AdminMiscTabComponent } from './admin-misc-tab/admin-misc-tab.component';
import { AdminManageUsersTabComponent } from './admin-manage-users-tab/admin-manage-users-tab.component';
import { AdminGuard } from './admin/admin-panel.guard';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoadingComponent,
    AdminComponent,
    AdminManageMedicinesTabComponent,
    AdminManageMedicamentCategoriesTabComponent,
    AdminMiscTabComponent,
    AdminManageUsersTabComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    AdminGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
