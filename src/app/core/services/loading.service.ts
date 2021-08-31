import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';
import { LoadingController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppState } from 'src/app/store/app.reducers';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loading: HTMLIonLoadingElement;
  constructor(
    public loadingController: LoadingController,
    private store: Store<AppState>
  ) {
    this.store.select('ui').subscribe((ui) => {
      if (ui.loading) {
        this.presentLoading('cargando');
      } else {
        this.dismiss();
      }
    });
  }

  async presentLoading(message: string) {
    this.loading = await this.loadingController.create({
      message,
    });
    await this.loading.present();
  }

  async dismiss() {
    await this.loading?.dismiss();
  }
}
