import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class UserService {
    loadUsers():string[] {
        return ["admin", "manager","QA"];
    }

    constructor(private http:HttpClient){}

    addUserToDb(users:any) {
        console.log(users);
        this.http.post('https://mmc-training-15fbe-default-rtdb.firebaseio.com/demo.json',users)
        .subscribe((response)=>console.log(response));
    }

    loadUsersFromDb(){
        return this.http.get('https://mmc-training-15fbe-default-rtdb.firebaseio.com/demo.json');
    }   
}