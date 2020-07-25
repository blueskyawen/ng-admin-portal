import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ClusterManageService} from '../cluster-manage.service';

@Component({
  selector: 'cluster-overview',
  templateUrl: './cluster-overview.component.html',
  styleUrls: ['./cluster-overview.component.less']
})
export class ClusterOverviewComponent implements OnInit {
  links : any[] = [
    {
      label: this.translate.instant('cluster'),
      routerLink: ['/main/cluster/overview']
    }
   ];
  clusterId: string;
  clusterData: any;

  constructor(private translate: TranslateService, private clusterManageService: ClusterManageService) {
    this.links[0].label = `${this.links[0].label}: ${window.localStorage['clusterName']}`;
    this.clusterId = window.localStorage['clusterId'];
  }

  ngOnInit() {
    this.clusterManageService.getClusterById(this.clusterId).subscribe((res: any) => {
      this.clusterData = res;
      this.clusterData.alarms = [
        {name: this.translate.instant('dashboard.alarm.critical'),
          value: this.clusterData.alarm.critical || 0, color: '#ea4335'},
        {name: this.translate.instant('dashboard.alarm.serious'),
          value: this.clusterData.alarm.serious || 0, color: '#f3b709'},
        {name: this.translate.instant('dashboard.alarm.warning'),
          value: this.clusterData.alarm.warning || 0, color: '#fdde81'},
        {name: this.translate.instant('dashboard.alarm.prompt'),
          value: this.clusterData.alarm.prompt || 0, color: '#108ee9'}
      ];
      this.clusterData.servers = [
        {name: 'mon', label: 'MON', total: this.clusterData.mon.total,
          active: this.clusterData.mon.active, icon: 'px-view_control'},
        {name: 'server', label: this.translate.instant('menu.clusterManage.server'), total: this.clusterData.server.total,
          active: this.clusterData.server.active, icon: 'px-server'},
        {name: 'pool', label: this.translate.instant('menu.clusterManage.storagePool'), total: this.clusterData.pool.total,
          active: this.clusterData.pool.active, icon: 'px-cloud_environment'},
        {name: 'disk', label: this.translate.instant('menu.clusterManage.disk'), total: this.clusterData.disk.total,
          active: this.clusterData.disk.active, icon: 'px-cloud_hard_disk'},
        {name: 'iscsi', label: 'ISCSI', total: this.clusterData.iscsi.total,
          active: this.clusterData.iscsi.active, icon: 'px-elasticsearch_20'},
        {name: 'mds', label: 'MDS', total: this.clusterData.mds.total,
          active: this.clusterData.mds.active, icon: 'px-host_20'}
      ];
    });
  }

}
