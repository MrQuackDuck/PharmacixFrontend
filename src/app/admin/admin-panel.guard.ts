import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { LoadingService } from "../services/loading.service";
import { Observable } from "rxjs";

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private authService : AuthService, private router : Router, private loadingService : LoadingService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      this.loadingService.enableLoading();
      return this.authService.isAuthenticated().then(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigate(['/login']);
          this.loadingService.disableLoading()
          return false;
        }
        
        this.loadingService.disableLoading()
        return true;
      });
    }
  
}