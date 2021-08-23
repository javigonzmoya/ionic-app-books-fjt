import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        IonicModule.forRoot(),
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a form with email, password', () => {
    expect(component.registerForm.contains('email')).toBeTruthy();
    expect(component.registerForm.contains('password1')).toBeTruthy();
    expect(component.registerForm.contains('password2')).toBeTruthy();
  });

  it('should validate email formating and required', () => {
    const emailControl = component.registerForm.get('email');
    expect(emailControl.invalid).toBeTruthy();
    emailControl.setValue('kjskjskk');
    expect(emailControl.invalid).toBeTruthy();
    emailControl.setValue('kjskjskk@hjsahjd.com');
    expect(emailControl.valid).toBeTruthy();
    expect(component.registerForm.valid).toBeTruthy();
  });

  it('should valid in form password is required an min-lengh 6 and pass1 and pass2 togeder', () => {
    const passControl1 = component.registerForm.get('password1');
    const passControl2 = component.registerForm.get('password2');
    const emailControl = component.registerForm.get('email');

    passControl1.setValue('');
    passControl2.setValue('');
    expect(passControl1.invalid).toBeTruthy();
    expect(passControl2.invalid).toBeTruthy();

    passControl1.setValue('qqq');
    passControl2.setValue('qqq');
    expect(passControl1.invalid).toBeTruthy();
    expect(passControl2.invalid).toBeTruthy();

    passControl1.setValue('111111');
    passControl2.setValue('111112');
    emailControl.setValue('javi@gmail.com');
    expect(passControl1.valid).toBeTruthy();
    expect(passControl2.valid).toBeTruthy();
    expect(component.registerForm.invalid).toBeTruthy();

    passControl1.setValue('111111');
    passControl2.setValue('111111');
    emailControl.setValue('javi@gmail.com');
    expect(passControl1.valid).toBeTruthy();
    expect(passControl2.valid).toBeTruthy();
    expect(component.registerForm.valid).toBeTruthy();
  });

  it('should call submit form', () => {
    const submitButton: HTMLElement = fixture.debugElement.query(
      By.css('ion-button[type="submit"]')
    ).nativeElement;
    const spia = spyOn(component, 'register').and.callFake(() => true);

    submitButton.click();
    fixture.detectChanges();
    expect(spia).toHaveBeenCalledTimes(1);
  });

  it('should call alert because invalid params', () => {
    const spia = spyOn(component, 'presentAlert').and.callFake(() => true);
    component.register();
    expect(spia).toHaveBeenCalledTimes(1);
  });
});
