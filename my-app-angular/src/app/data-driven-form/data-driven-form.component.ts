import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../shared/services/userdata.service';

@Component({
  selector: 'app-data-driven-form',
  templateUrl: './data-driven-form.component.html',
  styleUrls: ['./data-driven-form.component.css']
})
export class DataDrivenFormComponent {
  constructor(private userData: UserService){
    this.createFormControl();
    this.createForm();
  }
  myForm: FormGroup;
  lname:FormControl;
  fname:FormControl;
  email:FormControl;
  pass:FormControl;
  accountType:FormControl;

  createFormControl(){
    this.lname = new FormControl('',Validators.required);
    this.fname = new FormControl('',Validators.required);
    this.email = new FormControl('',[Validators.required,Validators.email,this.emailDomainValidator]);
    this.pass = new FormControl('',[Validators.required, Validators.minLength(6)]);
    this.accountType = new FormControl('',[Validators.required]);
  }

  createForm(){
    this.myForm=new FormGroup({
      lname:this.lname,
      fname:this.fname,
      email:this.email,
      pass:this.pass,
      accountType:this.accountType
    })
  }

  emailDomainValidator(control:FormControl){
    let email = control.value
    if(email && email.indexOf('@') > -1){
      let domain = email.split('@')[1]
      if(domain != 'mmc.com'){
        return {
          emailDomain:{
            myDomain: domain
          }
        }
      }
    }
    return null;
  }

  users:any[] = [];
  addUser(){
    // console.log(this.myForm.value);
    this.userData.addUserToDb(this.myForm.value);
    // this.loadUsers();
  }

  loadUsers(){
    this.userData.loadUsersFromDb().subscribe((res)=>{
      const myArray = [];
      for(let key in res) {
        myArray.push(res[key]);
      }

      this.users = myArray;
    });
  }

  ngOnInit() {
    // this.loadUsers();
  }
}
