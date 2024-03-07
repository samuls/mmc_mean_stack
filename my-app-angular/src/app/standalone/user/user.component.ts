import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/shared/services/userdata.service';
import { AppstyleDirective } from 'src/app/shared/appstyle.directive';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, AppstyleDirective],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  weigthName: string = '';
  constructor(private us: UserService) {
    console.log(this.us.loadUsers());
  }
}
