import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SoraxCommonModule } from 'app/common/sorax-common.module';

import { AuthRoutes } from './auth.routing';
import { ChangePassowrdComponent } from './components/change-passowrd/change-passowrd.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SignupComponent } from './components/signup/signup.component';
import { VerifyUserComponent } from './components/verify-user/verify-user.component';
import { SelectAssociationComponent } from '../manage-association/components/select-association/select-association.component';

@NgModule({
  imports: [
    HttpClientModule,
    SoraxCommonModule,
    RouterModule.forChild(AuthRoutes),
  ],
  declarations:[
   LoginComponent,
    SignupComponent, 
    VerifyUserComponent, 
    ChangePassowrdComponent, 
    ResetPasswordComponent]
})
export default class AuthModule { }