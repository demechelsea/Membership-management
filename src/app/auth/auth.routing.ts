import { Routes } from '@angular/router';

import { ChangePassowrdComponent } from './components/change-passowrd/change-passowrd.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SignupComponent } from './components/signup/signup.component';
import { VerifyUserComponent } from './components/verify-user/verify-user.component';

export const AuthRoutes: Routes = [
  {
    path: "",
    children: [
      { path: "login", component: LoginComponent, data:{title:"Login"} },
      { path: "signup", component: SignupComponent },
      { path: "verifyUser/:id", component: VerifyUserComponent },
      { path: "forgotPassword", component: ResetPasswordComponent },
      { path: "changePassword/:id", component: ChangePassowrdComponent },
    ]
  }
];

