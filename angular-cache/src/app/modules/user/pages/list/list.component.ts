import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public userList: any[] = [];
  constructor(private _userService: UserService) {}

  ngOnInit(): void {
    this._userService.getAll().subscribe((result: any[]) => {
      this.userList = result.slice(0, 10);
    });
  }
}
