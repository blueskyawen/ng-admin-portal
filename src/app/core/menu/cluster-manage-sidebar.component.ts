import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {StorageService} from '../storage.service';
import {Router} from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'cluster-manage-sidebar',
  templateUrl: './cluster-manage-sidebar.component.html',
  styleUrls: ['./sidebar.less']
})
export class ClusterManageSidebarComponent implements OnInit {
  sidebarCfgs: any[] = [
    {
      groupName: this.translate.instant('menu.clusterManage.overview'),
      children: [
        {
          name: 'dashboard',
          icon: 'dashboard',
          active: true,
          url: '/main/cluster/overview',
          label: this.translate.instant('menu.clusterManage.overview')
        }
      ]
    },
    {
      groupName: this.translate.instant('menu.clusterManage.service'),
      children: [
        {
          name: 'pool',
          icon: 'cloud',
          active: false,
          url: '/main/cluster/blockStorage/pool',
          label: this.translate.instant('menu.clusterManage.storagePool')
        },
        {
          name: 'blockStorage',
          icon: 'inbox',
          active: false,
          label: this.translate.instant('menu.clusterManage.blockStorage'),
          children: [
            {
              name: 'volume',
              active: false,
              url: '/main/cluster/blockStorage/volume',
              label: this.translate.instant('menu.clusterManage.volume'),
            },
            {
              name: 'host',
              active: false,
              url: '/main/cluster/blockStorage/host',
              label: this.translate.instant('menu.clusterManage.host'),
            },
            {
              name: 'group',
              active: false,
              url: '/main/cluster/blockStorage/group',
              label: this.translate.instant('menu.clusterManage.group'),
            },
            {
              name: 'snapshot',
              active: false,
              url: '/main/cluster/blockStorage/snapshot',
              label: this.translate.instant('menu.clusterManage.snapshot'),
            },
            {
              name: 'trash',
              active: false,
              url: '/main/cluster/blockStorage/trash',
              label: this.translate.instant('menu.clusterManage.trash'),
            }
          ]
        },
        {
          name: 'fileStorage',
          icon: 'file',
          active: false,
          label: this.translate.instant('menu.clusterManage.fileStorage'),
          children: [
            {
              name: 'configLeader',
              active: false,
              url: '/main/cluster/fileStorage/configLeader',
              label: this.translate.instant('menu.clusterManage.configLeader'),
            },
            {
              name: 'mds',
              active: false,
              url: '/main/cluster/fileStorage/mds',
              label: 'MDS',
            },
            {
              name: 'fileSystem',
              active: false,
              url: '/main/cluster/fileStorage/fileSystem',
              label: this.translate.instant('menu.clusterManage.fileSystem'),
            },
            {
              name: 'nfs',
              active: false,
              url: '/main/cluster/fileStorage/nfs',
              label: 'NFS',
            },
            {
              name: 'fileBackuo',
              active: false,
              url: '/main/cluster/fileStorage/fileBackup',
              label: this.translate.instant('menu.clusterManage.fileBackuo'),
            }
          ]
        }
      ]
    },
    {
      groupName: this.translate.instant('menu.clusterManage.system'),
      children: [
        {
          name: 'topology',
          icon: 'share-alt',
          active: false,
          url: '/main/cluster/system/topology',
          label: this.translate.instant('menu.clusterManage.topology')
        },
        {
          name: 'server',
          icon: 'layout',
          active: false,
          url: '/main/cluster/system/server',
          label: this.translate.instant('menu.clusterManage.server')
        },
        {
          name: 'switch',
          icon: 'fork',
          active: false,
          url: '/main/cluster/system/switch',
          label: this.translate.instant('menu.clusterManage.switch')
        },
        {
          name: 'disk',
          icon: 'wallet',
          active: false,
          url: '/main/cluster/system/disk',
          label: this.translate.instant('menu.clusterManage.disk')
        },
        {
          name: 'cachePool',
          icon: 'gold',
          active: false,
          url: '/main/cluster/system/cachePool',
          label: this.translate.instant('menu.clusterManage.cachePool')
        }
      ]
    },
    {
      groupName: this.translate.instant('menu.clusterManage.monitor'),
      children: [
        {
          name: 'performance',
          icon: 'line-chart',
          active: false,
          label: this.translate.instant('menu.clusterManage.performance'),
          children: [
            {
              name: 'clusterPerformance',
              active: false,
              url: '/main/cluster/performance/clusterPerformance',
              label: this.translate.instant('menu.clusterManage.clusterPerformance'),
            },
            {
              name: 'queryExport',
              active: false,
              url: '/main/cluster/performance/queryExport',
              label: this.translate.instant('menu.clusterManage.queryExport'),
            }
          ]
        },
        {
          name: 'alarm',
          icon: 'alert',
          active: false,
          label: this.translate.instant('menu.clusterManage.alarm'),
          children: [
            {
              name: 'currentAlarm',
              active: false,
              url: '/main/cluster/alarm/currentAlarm',
              label: this.translate.instant('menu.clusterManage.currentAlarm'),
            },
            {
              name: 'historyAlarm',
              active: false,
              url: '/main/cluster/alarm/historyAlarm',
              label: this.translate.instant('menu.clusterManage.historyAlarm'),
            }
          ]
        },
        {
          name: 'log',
          icon: 'file-pdf',
          active: false,
          url: '/main/cluster/moniter/log',
          label: this.translate.instant('menu.clusterManage.log')
        },
        {
          name: 'taskList',
          icon: 'tags',
          active: false,
          url: '/main/cluster/moniter/taskList',
          label: this.translate.instant('menu.clusterManage.taskList')
        },
        {
          name: 'config',
          icon: 'setting',
          active: false,
          label: this.translate.instant('menu.clusterManage.config'),
          children: [
            {
              name: 'upgrade',
              active: false,
              url: '/main/cluster/config/upgrade',
              label: this.translate.instant('menu.clusterManage.upgrade'),
            },
            {
              name: 'maintenance',
              active: false,
              url: '/main/cluster/config/maintenance',
              label: this.translate.instant('menu.clusterManage.maintenance'),
            },
            {
              name: 'ntp',
              active: false,
              url: '/main/cluster/config/ntp',
              label: this.translate.instant('menu.clusterManage.ntp'),
            },
            {
              name: 'advanced',
              active: false,
              url: '/main/cluster/config/advanced',
              label: this.translate.instant('menu.clusterManage.advanced'),
            },
            {
              name: 'oneButtonDeploy',
              active: false,
              url: '/main/cluster/config/oneButtonDeploy',
              label: this.translate.instant('menu.clusterManage.oneButtonDeploy'),
            }
          ]
        }
      ]
    }
  ];
  clusterName: string = '';

  constructor(private translate: TranslateService, public storageService: StorageService,
              private router: Router) {
    this.clusterName = this.storageService.getLocalStorage('clusterName');
  }

  ngOnInit() {
    this.storageService.getCurrentUrlSub().subscribe((res: any) => {
      if (res.includes('/main/cluster')) {
        this.checkMenuActive(res === '/main/cluster' ? res + '/overview' : res);
      }
    });
  }

  checkMenuActive(url: string) {
    this.clearActive();
    for (const cfg of this.sidebarCfgs) {
      for (const item of cfg.children) {
        if (item.children) {
          for (const item2 of item.children) {
            if (item2.url === url) {
              item2.active = true;
              this.checkParentActive();
              return;
            }
          }
        } else {
          if (item.url === url) {
            item.active = true;
            return;
          }
        }
      }
    }
  }

  clickSecondMenu(item: any) {
    if (!item.children) {
      this.router.navigate([item.url]);
    } else {
      item.expand = !item.expand;
    }
  }

  clearActive() {
    for (const cfg of this.sidebarCfgs) {
      for (const item of cfg.children) {
        item.active = false;
        if (item.children) {
          for (const item2 of item.children) {
            item2.active = false;
          }
        }
      }
    }
  }

  checkParentActive() {
    for (const cfg of this.sidebarCfgs) {
      for (const item of cfg.children) {
        if (item.children && item.children.find(x => x.active)) {
          item.active = true;
          item.expand = item.active;
          return;
        }
      }
    }
  }

}
