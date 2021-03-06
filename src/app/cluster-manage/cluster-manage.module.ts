import { NgModule } from '@angular/core';
import { ShareModule } from '../share/share.module';

import { ServeModule } from './serve/serve.module';

import { ClusterManageRoutingModule } from './cluster-manage-routing.module';
import { ClusterOverviewComponent } from './overview/cluster-overview.component';
import { AddClusterComponent } from './add/add-cluster.component';
import { ClusterDashboardComponent } from './dashboard/cluster-dashboard.component';
import { ClusterAlarmComponent } from './alarm/cluster-alarm.component';

@NgModule({
  imports: [
    ShareModule,
    ClusterManageRoutingModule,
    ServeModule
  ],
  declarations: [ClusterOverviewComponent, AddClusterComponent, ClusterDashboardComponent, ClusterAlarmComponent],
  exports: [AddClusterComponent, ClusterDashboardComponent]
})
export class ClusterManageModule { }
