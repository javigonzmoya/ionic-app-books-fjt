import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoomsScreenPage } from './rooms-screen.page';

const routes: Routes = [
  {
    path: '',
    component: RoomsScreenPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomsScreenPageRoutingModule {}
