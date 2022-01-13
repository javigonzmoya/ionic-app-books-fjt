import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { loadRooms, unSelectRoom } from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducers';
import { Room } from '../models/room.interface';
import { ModalFormRoomPage } from './modal-form-room/modal-form-room.page';

@Component({
  selector: 'app-rooms-screen',
  templateUrl: './rooms-screen.page.html',
  styleUrls: ['./rooms-screen.page.scss'],
})
export class RoomsScreenPage implements OnInit {
  rooms: Room[] = [];
  constructor(
    private store: Store<AppState>,
    public modalController: ModalController
  ) {}

  ngOnInit() {
    this.store.dispatch(loadRooms());
    this.store.select('rooms').subscribe(({ rooms }) => {
      this.rooms = rooms;
    });
  }

  newRoom() {
    this.store.dispatch(unSelectRoom());
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
