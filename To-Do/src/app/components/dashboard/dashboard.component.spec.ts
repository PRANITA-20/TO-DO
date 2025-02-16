import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { AuthenticationService } from '../../services/authentication.service';
import { By } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthenticationService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthenticationService', ['logout']);

    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [{ provide: AuthenticationService, useValue: authServiceSpy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] // Ignores <app-to-do> errors
    }).compileComponents();
  });

  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify('testuser'));
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.removeItem('user');
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve logged-in user from localStorage', () => {
    expect(component.loggedInUser).toBe('testuser');
  });

  it('should call logout method on button click', () => {
    const logoutButton = fixture.debugElement.query(By.css('button'));
    logoutButton.triggerEventHandler('click', null);

    expect(authServiceSpy.logout).toHaveBeenCalled();
  });

  it('should display the username in uppercase', () => {
    const userInfoElement = fixture.debugElement.query(By.css('.dashboard-user-info')).nativeElement;
    expect(userInfoElement.textContent).toContain('TESTUSER');
  });
});
