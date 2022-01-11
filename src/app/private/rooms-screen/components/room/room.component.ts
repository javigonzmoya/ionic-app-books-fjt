import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Room } from 'src/app/private/models/room.interface';
import { selectRoom } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducers';
import { ModalFormRoomPage } from '../../modal-form-room/modal-form-room.page';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent {
  @Input() rooms: Room[] = [];
  constructor(
    private store: Store<AppState>,
    private modalController: ModalController
  ) {}

  selectRoom(roomSelected: Room) {
    this.store.dispatch(selectRoom({ roomSelected }));
    this.presentModal();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalFormRoomPage,
      cssClass: 'my-custom-class',
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
  }
}
