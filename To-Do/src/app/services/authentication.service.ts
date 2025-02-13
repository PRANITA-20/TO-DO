import { Injectable } from '@angular/core';
import {User} from '../models/user';
import { Observable,of } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private users: User[] = [
    { id: 1, username: 'user1', password: '123456' },
    { id: 2, username: 'user2', password: '78910' },
    { id: 3, username: 'user3', password: '111234' },
    { id: 4, username: 'user4', password: '15161718' }
  ];
  constructor(private router: Router) { }
  getUsers(): Observable<User[]>{
    return of(this.users);
  }
  isLoggedIn(): boolean {
    return localStorage.getItem('user') !== null;
  }
  login(username: string, password: string): Observable<any> {
    const user = this.users.find(u => u.username === username && u.password === password);
    if(user){
      console.log(username,"us")
      localStorage.setItem('user', JSON.stringify({ username }));
    }
    return user
      ? of({success:true,message: 'Login successful' })
      : of({success:false,message: 'Invalid credentials'});
  }
  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
