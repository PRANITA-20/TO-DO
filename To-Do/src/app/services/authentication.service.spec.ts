import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

describe('AuthenticationService', () => {
  let routSpy: jasmine.SpyObj<Router>;
  let authServ: AuthenticationService;
  let http: HttpTestingController;
  
// creating a router that mocks the actual router
  beforeEach(() => {
    routSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthenticationService,
        { provide: Router, useValue: routSpy }
      ]
    });
    http = TestBed.inject(HttpTestingController);
    authServ = TestBed.inject(AuthenticationService);
  
  });
  //checks if there are any unhandled HTTP requests
  afterEach(() => {
    http.verify(); 
  });
// test cases
  it('should create Authentication service', () => {
    expect(authServ).toBeTruthy();
  });
  
  it('should return true if mock user is logged in', () => {
    localStorage.setItem('user', JSON.stringify('user1'));
    expect(authServ.isLoggedIn()).toBeTrue();
    localStorage.removeItem('user');
  });
  it('should return false if mock user is not logged in', () => {
    localStorage.removeItem('user');
    expect(authServ.isLoggedIn()).toBeFalse();
  });

  it('should fetch details of allowed login users from API', () => {
    const fakeUsers: User[] = [{id: 1, username: 'user1', password: '123456' }];
    authServ.getUsers().subscribe(users => {
      expect(users).toEqual(fakeUsers);
    });

    const req = http.expectOne('http://localhost:3000/users');
    expect(req.request.method).toBe('GET');
    req.flush(fakeUsers); // Simulate server response
  });

  it('should after logging out it should redirect to login', () => {
    localStorage.setItem('user', JSON.stringify('user1'));
    authServ.logout();
    expect(localStorage.getItem('user')).toBeNull();
    expect(routSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
