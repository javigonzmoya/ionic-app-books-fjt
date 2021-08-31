import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalFormRoomPage } from './modal-form-room.page';

const routes: Routes = [
  {
    path: '',
    component: ModalFormRoomPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalFormRoomPageRoutingModule {}
