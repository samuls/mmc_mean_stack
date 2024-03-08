import { Component } from '@angular/core';
import { RouteProtect } from '../shared/routeprotect';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css'],
})
export class UserdetailsComponent {
  constructor(private rp: RouteProtect, private route: Router) {}

  logout() {
    this.rp.isAllowed = false;
    this.route.navigate(['/login']);
  }
}
