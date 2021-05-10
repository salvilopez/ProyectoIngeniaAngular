import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      //this.authService.loggedIn &&

      if ( sessionStorage.getItem('token')) {
        return true
      } else {
        console.log(this.authService.loggedIn)
        console.log(sessionStorage.getItem('token'))
        // If the user is not logged in, we send him to login
        this.router.navigate(['/login']);
        return false;
      };
  }

}
