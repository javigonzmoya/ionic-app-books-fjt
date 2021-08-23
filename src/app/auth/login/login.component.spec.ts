import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        RouterTestingModule,
        IonicModule.forRoot(),
      ],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a form with email, password', () => {
    expect(component.loginForm.contains('email')).toBeTruthy();
    expect(component.loginForm.contains('password')).toBeTruthy();
  });

  it('should valid in form email is required and formatting email', () => {
    const emailControl = component.loginForm.get('email');
    emailControl.setValue('');
    expect(component.loginForm.invalid).toBeTruthy();
    emailControl.setValue('jahajhasj%huhuh.com');
    expect(component.loginForm.invalid).toBeTruthy();
    emailControl.setValue('jabem@gamil.com');
    expect(emailControl.valid).toBeTruthy();
  });

  it('should valid in form password is required an min-lengh 6', () => {
    const passControl = component.loginForm.get('password');
    passControl.setValue('');
    expect(component.loginForm.invalid).toBeTruthy();
    passControl.setValue('1111');
    expect(component.loginForm.invalid).toBeTruthy();
    passControl.setValue('182736');
    expect(passControl.valid).toBeTruthy();
  });

  it('should valid in form password and email togeder', () => {
    const passControl = component.loginForm.get('password');
    passControl.setValue('176789');
    const emailControl = component.loginForm.get('email');
    emailControl.setValue('jabem@gamil.com');
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('should call submit form', () => {
    const submitButton: HTMLElement = fixture.debugElement.query(
      By.css('ion-button[type="submit"]')
    ).nativeElement;
    const spia = spyOn(component, 'login').and.callFake(() => true);

    submitButton.click();
    fixture.detectChanges();
    expect(spia).toHaveBeenCalledTimes(1);
  });

  it('should call alert because invalid params', () => {
    const spia = spyOn(component, 'presentAlert').and.callFake(() => true);
    component.login();
    expect(spia).toHaveBeenCalledTimes(1);
  });
});
