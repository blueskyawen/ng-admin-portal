import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '../share/page-not-found.component';
import { UserConfigComponent } from './profile/user-config.component';

const routes: Routes = [
  {
    path: 'profile',
    component: UserConfigComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemManageRoutingModule { }
