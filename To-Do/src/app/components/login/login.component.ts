import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  username: string = '';
  password: string = '';
  errorMessage = '';
  authenticatedUserList: User[]=[];
  constructor(private authService: AuthenticationService, private router: Router){}
  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']); // Redirect logged-in users
    }
  }
  onLogin(): void {
 
    if (this.username && this.password) {
      this.authService.getUsers().subscribe(users=>{this.authenticatedUserList= users;
       console.log(this.authenticatedUserList,"aut")
       const user = this.authenticatedUserList.find(u => u.username === this.username && u.password === this.password);
        if(user){
           localStorage.setItem('user', JSON.stringify(this.username));
           this.router.navigate(['/dashboard']);
           this.errorMessage='';
        }else{
          this.errorMessage = 'Invalid credentials';
        }
      })
    
    }
  }
}
