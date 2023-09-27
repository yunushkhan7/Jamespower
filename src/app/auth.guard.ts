import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authservice: AuthService,private router: Router){}
  canActivate():boolean{

    if (!this.authservice.gettoken()) {
      this.router.navigateByUrl("/login");
      }
      return this.authservice.gettoken(); 
    
    }
  
}
