import { NgModule } from '@angular/core';
import { ShareModule } from '../share/share.module';

import { SystemManageRoutingModule } from './system-manage-routing.module';
import { UserConfigComponent } from './profile/user-config.component';
import { UserManageComponent } from './user/user-manage.component';

@NgModule({
  imports: [
    ShareModule,
    SystemManageRoutingModule
  ],
  declarations: [UserConfigComponent, UserManageComponent]
})
export class SystemManageModule { }
