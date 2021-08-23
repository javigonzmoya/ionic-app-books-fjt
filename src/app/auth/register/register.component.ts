import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { validateMachPassword } from 'src/app/core/helpers/custom.validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fB: FormBuilder,
    public alertController: AlertController,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.registerForm = this.fB.group(
      {
        email: ['', [Validators.email, Validators.required]],
        password1: [
          'javier',
          Validators.compose([Validators.required, Validators.minLength(6)]),
        ],
        password2: [
          'javier',
          Validators.compose([Validators.required, Validators.minLength(6)]),
        ],
      },
      { validator: validateMachPassword }
    );
  }

  register() {
    if (this.registerForm.invalid) {
      this.presentAlert();
      return;
    }
    console.log(this.registerForm.value);
  }

  presentAlert() {
    this.translate
      .stream(['ACCEPT', 'ALERT_ERROR_SUB', 'ALERT_ERROR_FORM'])
      .subscribe(async (resp) => {
        const alert = await this.alertController.create({
          cssClass: 'alert-text',
          subHeader: resp.ALERT_ERROR_SUB,
          message: resp.ALERT_ERROR_FORM,
          buttons: [resp.ACCEPT],
        });
        await alert.present();
      });
  }
}
