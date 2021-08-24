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

  it('should create a form correctly', () => {
    expect(component.registerForm.contains('name')).toBeTruthy();
    expect(component.registerForm.contains('apellido1')).toBeTruthy();
    expect(component.registerForm.contains('apellido2')).toBeTruthy();
    expect(component.registerForm.contains('telefono')).toBeTruthy();
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
  });

  it('should valid the form togeder', () => {
    const nameControl = component.registerForm.get('name');
    const ape1Control = component.registerForm.get('apellido1');
    const ape2Control = component.registerForm.get('apellido2');
    const telControl = component.registerForm.get('telefono');
    const passControl1 = component.registerForm.get('password1');
    const passControl2 = component.registerForm.get('password2');
    const emailControl = component.registerForm.get('email');

    nameControl.setValue('');
    ape1Control.setValue('');
    ape2Control.setValue('sdfsdf');
    telControl.setValue(2334);
    emailControl.setValue('');
    passControl1.setValue('');
    passControl2.setValue('');
    expect(component.registerForm.invalid).toBeTruthy();
    nameControl.setValue('javi');
    ape1Control.setValue('gonzalez');
    ape2Control.setValue('');
    telControl.setValue(233423456);
    emailControl.setValue('javi@gmail.com');
    passControl1.setValue('123456');
    passControl2.setValue('123456');
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
