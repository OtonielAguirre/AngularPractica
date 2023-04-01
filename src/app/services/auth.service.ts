import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivate {
  constructor(private utilsrv: UtilService, private router: Router) {}
  canActivate() {
    const isLogged = Boolean(this.utilsrv.getToken());
    if (!isLogged) {
      this.router.navigate(['login']);
    }
    return isLogged;
  }
}
