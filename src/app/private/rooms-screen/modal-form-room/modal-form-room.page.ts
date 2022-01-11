import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { ToastService } from 'src/app/core/services/toast.service';
import { addRoom, deleteRoom, editRoom } from 'src/app/store/actions';
import { startLoading } from 'src/app/store/actions/ui/ui.actions';
import { AppState } from 'src/app/store/app.reducers';
import { Room } from '../../models/room.interface';

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
    private toasCrt: ToastService
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
      this.toasCrt.presentToast('Error al introducir los datos');
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
    this.store.dispatch(deleteRoom({ id: this.roomSelected.id }));
    this.modalController.dismiss();
  }

  exit() {
    this.modalController.dismiss();
  }
}
