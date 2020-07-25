import { NgModule } from '@angular/core';
import { ShareModule } from '../share/share.module';

import { DashboardComponent } from './dashboard.component';
import { ClusterDashboardComponent } from './cluster-dashboard.component';

@NgModule({
  imports: [
    ShareModule
  ],
  declarations: [DashboardComponent, ClusterDashboardComponent ],
  exports: [ClusterDashboardComponent]
})
export class DashboardModule { }
