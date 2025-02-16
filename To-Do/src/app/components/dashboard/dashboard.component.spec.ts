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
    localStorage.setItem('user', JSON.stringify('user1'));
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.removeItem('user');
  });

  it('should create the Dashboard component', () => {
    expect(component).toBeTruthy();
  });

  it('should get logged user info', () => {
    expect(component.loggedInUser).toBe('user1');
  });

  it('should show the logged in user in uppercase in dashboard', () => {
    const user = fixture.debugElement.query(By.css('.dashboard-user-info')).nativeElement;
    expect(user.textContent).toContain('USER1');
  });
  it('should trigger logout() on logout button click', () => {
    const logoutBtn = fixture.debugElement.query(By.css('button'));
    logoutBtn.triggerEventHandler('click', null);
    expect(authServiceSpy.logout).toHaveBeenCalled();
  });
});
