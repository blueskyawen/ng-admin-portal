import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClusterOverviewComponent } from './overview/cluster-overview.component';
import { StoragePoolComponent } from './serve/storage-pool/storage-pool.component';

const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  {
    path: 'overview',
    component: ClusterOverviewComponent
  },
  {
    path: 'blockStorage',
    children: [
      {
        path: '**', component: StoragePoolComponent
      }
    ]
  },
  {
    path: 'fileStorage',
    children: [
      {
        path: '**', component: StoragePoolComponent
      }
    ]
  },
  {
    path: 'system',
    children: [
      {
        path: '**', component: StoragePoolComponent
      }
    ]
  },
  {
    path: 'moniter',
    children: [
      {
        path: '**', component: StoragePoolComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClusterManageRoutingModule { }

