import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

export class RouteProtect implements CanActivate {
  isAllowed = false;
  canActivate() {
    if (!this.isAllowed) {
      alert('Oops! You are not allowed');
    } else {
      this.isAllowed = true;
    }
    return this.isAllowed;
  }
}
