import { Component } from "@angular/core";
import { UserService } from "../shared/services/userdata.service";
import { ProjectService } from "../shared/services/project.service";

@Component({
    selector:"header-app",
    templateUrl:"./header.component.html",
    styleUrls:["./header.component.css"]
})

export class HeaderComponent{
    title="welcome to the header";
    constructor(public us:UserService,private pr:ProjectService){
        this.userdata = this.us.loadUsers();
        this.projectdata = this.pr.loadProject();
    }
    userdata;
    projectdata;
    // userdata = ['admin', 'manager', 'QA'];
}