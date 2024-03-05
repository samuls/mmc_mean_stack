import { Injectable } from "@angular/core";

@Injectable()
export class UserService {
    loadUsers():string[] {
        return ["admin", "manager","QA"];
    }
}