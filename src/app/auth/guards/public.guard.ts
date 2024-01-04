import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

// retorna un false o true, si es falso no lo deja pasar, por eso se usa el map, para revertir el valor
const heroesAuthStatus= ():Observable<boolean> | boolean => {
  const authService:AuthService = inject(AuthService);
  const router:Router = inject(Router);

  return authService.checkAuthenticationStatus()
  .pipe(
    tap((isAuthtenticated)=>{
          if(isAuthtenticated) router.navigate(['/heroes/list'])
      }),
    map( isAuthtenticated => !isAuthtenticated)
    )
}

export const canActivateGuardPublic: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
  ) => {
    console.log( {route, state} );
    return heroesAuthStatus();
}
