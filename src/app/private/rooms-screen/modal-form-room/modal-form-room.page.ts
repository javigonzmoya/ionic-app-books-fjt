import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppState } from 'src/app/store/app.reducers';
import { Room } from '../../models/room.model';

@Component({
  selector: 'app-modal-form-room',
  templateUrl: './modal-form-room.page.html',
  styleUrls: ['./modal-form-room.page.scss'],
})
export class ModalFormRoomPage implements OnInit {
  roomSelected: Room = null;
  save = '';
  constructor(
    public modalController: ModalController,
    private store: Store<AppState>,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.store.select('rooms').subscribe((rooms) => {
      this.roomSelected = rooms.roomSelected;
    });
    this.translate.stream('SAVE').subscribe((tagSave) => {
      this.save = tagSave;
      console.log(tagSave);
    });
  }

  dismissWithProps() {
    this.modalController.dismiss({
      nombre: 'Felipe',
      pais: 'España',
    });
  }
}
