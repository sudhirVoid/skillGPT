import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthServiceService, private router: Router) {}

   async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree>  {
    return this.authService.isAuthenticated().then(data=>{
      if(data){
        return true;
      }
      else{
        this.router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
      }
    })
    // if (await this.authService.isAuthenticated()) {
    //   return true; // User is authenticated, allow access
    // } else {
    //   // Redirect to login page with returnUrl
      
    // }
  }
}
