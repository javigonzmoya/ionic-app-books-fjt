import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoomsScreenPageRoutingModule } from './rooms-screen-routing.module';

import { RoomsScreenPage } from './rooms-screen.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonicModule,
    RoomsScreenPageRoutingModule,
  ],
  declarations: [RoomsScreenPage],
})
export class RoomsScreenPageModule {}
