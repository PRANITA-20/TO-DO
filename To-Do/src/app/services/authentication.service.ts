import { Injectable } from '@angular/core';
import {User} from '../models/user';
import { Observable,of } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private router: Router,private http: HttpClient ) { }
  private apiUrl = 'http://localhost:3000/users';
  getUsers(): Observable<User[]>{
    return this.http.get<any[]>(this.apiUrl);
  }
  isLoggedIn(): boolean {
    return localStorage.getItem('user') !== null;
  }
  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
