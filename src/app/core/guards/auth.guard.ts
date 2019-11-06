import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

const ErrorMessage = 'You are not authorized!';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    /**
     * <pre>
     * <b>Method name: constructor</b>
     * <b>Explanation: </b> Method constructor
     * </pre>
     * @author GCS 2019/08/25 by linhdh
     *
     */
    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    /**
     * <pre>
     * <b>Method name: canActivate</b>
     * <b>Explanation: </b> Method setting can activate routing
     * </pre>
     * @author GCS 2019/08/25 by linhdh
     *
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate(['/']);
            return false;
        }
        return true;
    }
}
