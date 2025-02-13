import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
username:any;
loggedInUser:any;
constructor(private authServ: AuthenticationService){
  this.username=localStorage.getItem('user');
  this.loggedInUser=JSON.parse(this.username);
}
logout(){
 this.authServ.logout();
}
}
