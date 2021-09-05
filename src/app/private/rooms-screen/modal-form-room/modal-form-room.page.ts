import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { addRoom, editRoom } from 'src/app/store/actions/rooms';
import { startLoading } from 'src/app/store/actions/ui/ui.actions';
import { AppState } from 'src/app/store/app.reducers';
import { Room } from '../../models/room.model';

@Component({
  selector: 'app-modal-form-room',
  templateUrl: './modal-form-room.page.html',
  styleUrls: ['./modal-form-room.page.scss'],
})
export class ModalFormRoomPage implements OnInit {
  roomSelected: Room = null;
  name = '';
  capacity = '';
  description = '';
  constructor(
    public modalController: ModalController,
    private store: Store<AppState>,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.store.select('rooms').subscribe((rooms) => {
      this.roomSelected = rooms.roomSelected;
      if (this.roomSelected) {
        this.name = this.roomSelected.name;
        this.description = this.roomSelected.description;
        this.capacity = this.roomSelected.capacity;
      }
    });
  }

  saveRoom() {
    if (
      this.name.trim().length < 3 ||
      this.capacity.trim().length < 3 ||
      this.description.trim().length < 3
    ) {
      return;
    }
    const room: Room = {
      name: this.name,
      capacity: this.capacity,
      description: this.description,
    };
    if (this.roomSelected) {
      this.store.dispatch(startLoading());
      this.store.dispatch(editRoom({ id: this.roomSelected.id, room }));
    } else {
      this.store.dispatch(startLoading());
      this.store.dispatch(addRoom({ room }));
    }
    this.modalController.dismiss();
  }

  deleteRoom() {
    this.modalController.dismiss();
  }

  exit() {
    this.modalController.dismiss();
  }
}
