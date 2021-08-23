import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fB: FormBuilder,
    public alertController: AlertController,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.loginForm = this.fB.group({
      email: ['', [Validators.email, Validators.required]],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.presentAlert();
      return;
    }
    console.log(this.loginForm.value);
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
