import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeModule } from './modules/home/home.module';
import { LoginComponent } from './modules/login/login.component';

const appRoutes: Routes = [
  {
    path: 'home',
    loadChildren: './modules/home/home.module#HomeModule'
  },
  { path: '', 
    redirectTo: '/login', 
    pathMatch: 'full'
  },
  { path: '**', 
    redirectTo: '/login'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
