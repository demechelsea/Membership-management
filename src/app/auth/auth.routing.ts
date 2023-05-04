import { Routes } from '@angular/router';

import { ChangePassowrdComponent } from './components/change-passowrd/change-passowrd.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SignupComponent } from './components/signup/signup.component';
import { VerifyUserComponent } from './components/verify-user/verify-user.component';
import { SelectAssociationComponent } from './components/select-association/select-association.component';

export const AuthRoutes: Routes = [
  {
    path: "",
    children: [
      {path: "", redirectTo: 'login',pathMatch: 'full'},
      { path: "login", component: LoginComponent, data:{title:"Login"} },
      { path: "signup", component: SignupComponent, data:{title:"Signup"}},
      { path: "verifyUser/:id", component: VerifyUserComponent , data:{title:"Account Verification"}},
      { path: "selectMappedAssociation/:id", component: SelectAssociationComponent , data:{title:"Select Association"}},
      { path: "forgotPassword", component: ResetPasswordComponent , data:{title:"Reset Passwrod"}},
      { path: "changePassword/:id", component: ChangePassowrdComponent, data:{title:"Change Passwrod"} },
    ]
  }
];

