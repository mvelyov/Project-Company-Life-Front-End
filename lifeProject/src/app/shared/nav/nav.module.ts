import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav.component';
import { RouterModule, Routes } from '@angular/router';
import { DialogComponent, LoginModalComponent } from './login-modal/login-modal.component';
import { RegisterComponent, RegistrationComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule
  ],
  declarations: [
    NavComponent,
    DialogComponent, 
    LoginModalComponent,
    RegisterComponent, 
    RegistrationComponent,
  ],
  exports: [
    NavComponent,
    DialogComponent, 
    LoginModalComponent,
    RegisterComponent, 
    RegistrationComponent,
  ],
  entryComponents: [DialogComponent, RegistrationComponent],
})
export class NavModule { }