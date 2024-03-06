import { Component } from '@angular/core';
import { UserService } from '../shared/services/userdata.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-forms',
  templateUrl: './template-forms.component.html',
  styleUrls: ['./template-forms.component.css']
})
export class TemplateFormsComponent {
  user = {
    fname: '',
    lname: '',
    email: '',
    password: '',
    accountType: ''
  };

  constructor(private us:UserService) {

  }

  addUser(nf:NgForm){
    console.log(nf.value);
    this.us.addUserToDb(nf.value);
  }

}
