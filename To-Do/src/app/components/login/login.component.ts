import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage = '';
  constructor(private authService: AuthenticationService, private router: Router){}
  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']); // Redirect logged-in users
    }
  }
  onLogin() {
 
    if (this.username && this.password) {
     
      this.authService.login(this.username, this.password).subscribe(response => {
        if (response.success) {
          this.router.navigate(['/dashboard']);
          this.errorMessage = '';
        } else {
          this.errorMessage = response.message;
        }
      });
    
    } else {
      this.errorMessage = '';
    }
  }
}
