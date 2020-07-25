import { NgModule } from '@angular/core';
import { ShareModule } from '../share/share.module';
import { HttpClientModule } from '@angular/common/http';

import { FullComponent } from './full.component';

import { StorageService } from './storage.service';
import { httpInterceptorProviders } from './interceptor';
import { SystemManageSidebarComponent } from './menu/system-manage-sidebar.component';
import { ClusterManageSidebarComponent } from './menu/cluster-manage-sidebar.component';

@NgModule({
  imports: [ ShareModule, HttpClientModule ],
  declarations: [ FullComponent, SystemManageSidebarComponent,
    ClusterManageSidebarComponent ],
  providers: [ StorageService, httpInterceptorProviders ],
  exports: [ ]
})
export class CoreModule { }
