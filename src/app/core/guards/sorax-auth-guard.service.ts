import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { LoginService } from 'app/auth/service/login.service';


@Injectable({
  providedIn: 'root'
})
export class SoraxAuthGuard implements CanActivate{

  constructor(private router:Router, private loginService:LoginService) { }

  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot){
   // when user is authenticated, it will execute the route which gets called
    if(this.loginService.isLoggedIn()){
      return true;
    }

      //if user is not logged in, user will get navigated to login page 
      //and once login it will navigate to other return url
      this.router.navigate(['/auth/login'],{queryParams:{ returnUrl:state.url}});
      //this.router.navigate(['/login']);
      return false;    
  }

} 