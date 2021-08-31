import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalFormRoomPageRoutingModule } from './modal-form-room-routing.module';

import { ModalFormRoomPage } from './modal-form-room.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ModalFormRoomPageRoutingModule,
  ],
  declarations: [ModalFormRoomPage],
})
export class ModalFormRoomPageModule {}
