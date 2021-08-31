import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { validateMachPassword } from 'src/app/core/helpers/custom.validators';
import { ReqRegister } from 'src/app/core/models/reqRegister.model';
import { ToastService } from 'src/app/core/services/toast.service';
import { register } from 'src/app/store/actions/auth';
import { AppState } from 'src/app/store/app.reducers';

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
    private translate: TranslateService,
    private store: Store<AppState>,
    public toastServive: ToastService
  ) {}

  ngOnInit() {
    this.registerForm = this.fB.group(
      {
        name: ['javier', [Validators.required]],
        apellido1: ['hhdhddhdh', [Validators.required]],
        apellido2: ['ddsfdfddf'],
        telefono: [
          2367346382476,
          [Validators.required, Validators.minLength(9)],
        ],
        email: ['jfnksdjb@gmail.com', [Validators.email, Validators.required]],
        password1: [
          '123456',
          Validators.compose([Validators.required, Validators.minLength(6)]),
        ],
        password2: [
          '123456',
          Validators.compose([Validators.required, Validators.minLength(6)]),
        ],
      },
      { validator: validateMachPassword }
    );
    this.store.select('auth').subscribe((auth) => {
      if (auth.error) {
        this.toastServive.presentToast(auth.error.error?.msg);
      }
    });
  }

  register() {
    if (this.registerForm.invalid) {
      this.presentAlert();
      return;
    }
    const dataForm: ReqRegister = {
      ...this.registerForm.value,
      password: this.registerForm.get('password1').value,
    };

    this.store.dispatch(register(dataForm));
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
