import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { login } from 'src/app/store/actions';
import { startLoading } from 'src/app/store/actions/ui/ui.actions';
import { AppState } from 'src/app/store/app.reducers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loadingText = '';
  accept = '';
  alertErrorSub = '';
  alertErrorForm = '';
  transteSub: Subscription;

  constructor(
    private fB: FormBuilder,
    public alertController: AlertController,
    private translate: TranslateService,
    private store: Store<AppState>,
    public loadingService: LoadingService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.loginForm = this.fB.group({
      email: ['javier2@gmail.com', [Validators.email, Validators.required]],
      password: [
        'javier',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });
    this.transteSub = this.translate
      .stream(['ACCEPT', 'ALERT_ERROR_SUB', 'ALERT_ERROR_FORM', 'LOADING'])
      .subscribe((tags) => {
        this.loadingText = tags.LOADING;
        this.accept = tags.ACCEPT;
        this.alertErrorSub = tags.ALERT_ERROR_SUB;
        this.alertErrorForm = tags.ALERT_ERROR_FORM;
      });
    this.store.select('auth').subscribe((auth) => {
      if (auth.error) {
        this.toastService.presentToast(auth.error?.error.msg);
      }
    });
  }

  ngOnDestroy() {
    this.transteSub.unsubscribe();
  }

  login() {
    if (this.loginForm.invalid) {
      this.presentAlert();
      return;
    }
    const { email = '', password = '' } = this.loginForm.value;

    this.store.dispatch(startLoading());
    this.store.dispatch(login({ email, password }));
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'alert-text',
      subHeader: this.alertErrorSub,
      message: this.alertErrorForm,
      buttons: [this.accept],
    });
    await alert.present();
  }
}
