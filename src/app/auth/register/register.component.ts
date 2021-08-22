import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fB: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.fB.group({
      email: ['', [Validators.email]],
      password1: [
        'javier',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
      password2: [
        'javier',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });
  }

  submitHanle() {
    console.log(this.registerForm.value);
  }
}
