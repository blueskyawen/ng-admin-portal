import { NgModule } from '@angular/core';
import { ShareModule } from '../share/share.module';

import { ServeModule } from './serve/serve.module';
import { DashboardModule } from '../dashboard/dashboard.module';

import { ClusterManageRoutingModule } from './cluster-manage-routing.module';
import { ClusterOverviewComponent } from './overview/cluster-overview.component';

@NgModule({
  imports: [
    ShareModule,
    ClusterManageRoutingModule,
    ServeModule,
    DashboardModule
  ],
  declarations: [ClusterOverviewComponent]
})
export class ClusterManageModule { }
