import { ActivatedRouteSnapshot, CanActivateChild, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import {Observable, of} from 'rxjs'
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private auth: AuthService, private router: Router){

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (this.auth.isAuth()){
      return of(true)
    }else{
      Swal.fire({
        title: 'Вам нужно авторизоваться',
        text: "Хотите это сделать прямо сейчас?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Нет',
        confirmButtonText: 'Да, хочу'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login'])
        }
      })
      return of(false);
    }
  }
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(route, state);
  }
}
