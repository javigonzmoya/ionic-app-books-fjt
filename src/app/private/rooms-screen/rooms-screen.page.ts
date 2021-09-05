import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import {
  loadRooms,
  selectRoom,
  unSelectRoom,
} from 'src/app/store/actions/rooms';
import { AppState } from 'src/app/store/app.reducers';
import { Room } from '../models/room.model';
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
      console.log(rooms);
      this.rooms = rooms;
    });
  }

  selectRoom(roomSelected: Room) {
    this.store.dispatch(selectRoom({ roomSelected }));
    this.presentModal();
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
    console.log('onWillDismiss');

    console.log(data);
  }
}
