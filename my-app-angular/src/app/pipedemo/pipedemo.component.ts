import { Component } from '@angular/core';

@Component({
  selector: 'app-pipedemo',
  templateUrl: './pipedemo.component.html',
  styleUrls: ['./pipedemo.component.css']
})
export class PipedemoComponent {
  userdata={
    name:'samadhan',
    income:95000,
    rating:4.555,
    DOJ:new Date('11/11/2024'),
    description:'Welcome to angular-pipedemo',
    city:'Pune'
  }
}
