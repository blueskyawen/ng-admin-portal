import { NgModule } from '@angular/core';
import { ShareModule } from '../share/share.module';

import { ClusterManageModule } from '../cluster-manage/cluster-manage.module';

import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    ShareModule, ClusterManageModule
  ],
  declarations: [DashboardComponent ],
})
export class DashboardModule { }
