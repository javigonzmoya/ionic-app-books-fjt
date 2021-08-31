import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PrivateGuard } from './core/guards/private.guard';
import { PublicGuard } from './core/guards/public.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'public',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((m) => m.AuthPageModule),
  },
  {
    path: 'private',
    canLoad: [PrivateGuard],
    loadChildren: () =>
      import('./private/private.module').then((m) => m.PrivatePageModule),
  },
  {
    path: 'public',
    canLoad: [PublicGuard],
    loadChildren: () =>
      import('./public/public.module').then((m) => m.PublicPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
