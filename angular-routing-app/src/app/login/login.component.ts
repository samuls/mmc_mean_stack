import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RouteProtect } from '../shared/routeprotect';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private rp: RouteProtect, private route: Router) {}
  login(nf: NgForm) {
    this.rp.isAllowed = true;
    this.route.navigateByUrl('userdetails');
  }
}
