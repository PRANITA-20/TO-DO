import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login.component';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthenticationService>;
  let routerSpy: jasmine.SpyObj<Router>;
  beforeEach(async () => {
    // Mock AuthenticationService and Router
    authServiceSpy = jasmine.createSpyObj('AuthenticationService', ['getUsers', 'isLoggedIn']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: AuthenticationService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();
  });
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should redirect to dashboard if already logged in', () => {
    authServiceSpy.isLoggedIn.and.returnValue(true);
    component.ngOnInit();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
  it('should show an error message if username or password is missing', () => {
    component.username = '';
    component.password = '';
    component.onLogin();
    expect(component.errorMessage).toBe('Username and password are required.');
  });
  it('should authenticate and navigate to dashboard on successful login', () => {
    component.username = 'testuser';
    component.password = 'testpass';

    const mockUsers = [{ id: 1,username: 'testuser', password: 'testpass' }];
    authServiceSpy.getUsers.and.returnValue(of(mockUsers));

    component.onLogin();

    expect(authServiceSpy.getUsers).toHaveBeenCalled();
    expect(localStorage.getItem('user')).toEqual(JSON.stringify('testuser'));
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
    expect(component.errorMessage).toBe('');
  });

  it('should show an error message if credentials are incorrect', () => {
    component.username = 'wronguser';
    component.password = 'wrongpass';

    const mockUsers = [{ id:1,username: 'testuser', password: 'testpass' }];
    authServiceSpy.getUsers.and.returnValue(of(mockUsers));

    component.onLogin();

    expect(authServiceSpy.getUsers).toHaveBeenCalled();
    expect(component.errorMessage).toBe('Invalid credentials');
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should show an error message if API call fails', () => {
    authServiceSpy.getUsers.and.returnValue(throwError(() => new Error('API error')));

    component.username = 'testuser';
    component.password = 'testpass';
    component.onLogin();

    expect(authServiceSpy.getUsers).toHaveBeenCalled();
    expect(component.errorMessage).toBe('An error occurred. Please try again.');
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
  
});
