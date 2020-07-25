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
            active: item.mon.active, icon: 'px-view_control'},
          {name: 'server', label: this.translate.instant('menu.clusterManage.server'), total: item.server.total,
            active: item.server.active, icon: 'px-server'},
          {name: 'pool', label: this.translate.instant('menu.clusterManage.storagePool'), total: item.pool.total,
            active: item.pool.active, icon: 'px-cloud_environment'},
          {name: 'disk', label: this.translate.instant('menu.clusterManage.disk'), total: item.disk.total,
            active: item.disk.active, icon: 'px-cloud_hard_disk'},
          {name: 'iscsi', label: 'ISCSI', total: item.iscsi.total,
            active: item.iscsi.active, icon: 'px-elasticsearch_20'},
          {name: 'mds', label: 'MDS', total: item.mds.total,
            active: item.mds.active, icon: 'px-host_20'}
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
    window.localStorage['clusterName'] = this.curCluster.name;
    window.localStorage['clusterId'] = this.curCluster.id;
    this.router.navigate(['/main/cluster']);
  }

}
