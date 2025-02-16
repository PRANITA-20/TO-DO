import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    // Create a mock router
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthenticationService,
        { provide: Router, useValue: routerSpy }
      ]
    });

    service = TestBed.inject(AuthenticationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensures that no unmatched requests are left
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch users from API', () => {
    const mockUsers: User[] = [{id: 1, username: 'testuser', password: 'testpass' }];

    service.getUsers().subscribe(users => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('http://localhost:3000/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers); // Simulate server response
  });

  it('should return true if user is logged in', () => {
    localStorage.setItem('user', JSON.stringify('testuser'));
    expect(service.isLoggedIn()).toBeTrue();
    localStorage.removeItem('user');
  });

  it('should return false if user is not logged in', () => {
    localStorage.removeItem('user');
    expect(service.isLoggedIn()).toBeFalse();
  });

  it('should log out and navigate to login', () => {
    localStorage.setItem('user', JSON.stringify('testuser'));

    service.logout();

    expect(localStorage.getItem('user')).toBeNull();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
