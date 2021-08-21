import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrivatePageRoutingModule } from './private-routing.module';

import { PrivatePage } from './private.page';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CoreModule,
    PrivatePageRoutingModule,
  ],
  declarations: [PrivatePage],
})
export class PrivatePageModule {}
