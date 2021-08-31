import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BooksScreenPage } from './books-screen.page';

const routes: Routes = [
  {
    path: '',
    component: BooksScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksScreenPageRoutingModule {}
