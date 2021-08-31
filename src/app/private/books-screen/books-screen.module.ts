import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BooksScreenPageRoutingModule } from './books-screen-routing.module';

import { BooksScreenPage } from './books-screen.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BooksScreenPageRoutingModule
  ],
  declarations: [BooksScreenPage]
})
export class BooksScreenPageModule {}
