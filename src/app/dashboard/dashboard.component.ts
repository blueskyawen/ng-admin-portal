import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '../core';
import {Router} from "@angular/router";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  clusters: any[];
  curCluster: any;
  visible = false;

  constructor(private http: HttpClient, private translate: TranslateService,
              private storageService: StorageService, private router: Router) { }

  ngOnInit() {
    this.http.get('/api/cluster/list').subscribe((res: any) => {
      this.clusters = res.clusters.map(item => {
        item.alarms = [
          {name: this.translate.instant('dashboard.alarm.critical'), value: item.alarm.critical || 0, color: '#ea4335'},
          {name: this.translate.instant('dashboard.alarm.serious'), value: item.alarm.serious || 0, color: '#f3b709'},
          {name: this.translate.instant('dashboard.alarm.warning'), value: item.alarm.warning || 0, color: '#fdde81'},
          {name: this.translate.instant('dashboard.alarm.prompt'), value: item.alarm.prompt || 0, color: '#108ee9'}
        ];
        item.servers = [
          {name: 'mon', label: 'MON', total: item.mon.total,
            active: item.mon.active, icon: 'save'},
          {name: 'server', label: this.translate.instant('menu.clusterManage.server'), total: item.server.total,
            active: item.server.active, icon: 'layout'},
          {name: 'pool', label: this.translate.instant('menu.clusterManage.storagePool'), total: item.pool.total,
            active: item.pool.active, icon: 'cloud'},
          {name: 'disk', label: this.translate.instant('menu.clusterManage.disk'), total: item.disk.total,
            active: item.disk.active, icon: 'wallet'},
          {name: 'iscsi', label: 'ISCSI', total: item.iscsi.total,
            active: item.iscsi.active, icon: 'project'},
          {name: 'mds', label: 'MDS', total: item.mds.total,
            active: item.mds.active, icon: 'robot'}
        ];
        return item;
      });
      if (this.clusters[0]) {
        this.curCluster = this.clusters[0];
      }
    });
  }

  selectCluster(item: any) {
    this.curCluster = item;
  }

  toClusterManage() {
    this.storageService.setLocalStorage('clusterName', this.curCluster.name);
    this.storageService.setLocalStorage('clusterId', this.curCluster.id);
    this.router.navigate(['/main/cluster']);
  }

  handleAddCluster(result) {
    this.visible = false;
  }

}
