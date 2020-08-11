import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {StorageService} from '../storage.service';

@Component({
  selector: 'menu-panel',
  templateUrl: './menu-panel.component.html',
  styleUrls: ['./menu-panel.component.less']
})
export class MenuPanelComponent implements OnInit {
  s_menus: any[] = [
    {
      label: this.translate.instant('menu.sysManage.name'),
      children: [
        {
          name: 'profile',
          icon: 'user',
          url: '/main/system/profile',
          label: this.translate.instant('menu.sysManage.profile')
        },
        {
          name: 'user',
          icon: 'team',
          url: '/main/system/user',
          label: this.translate.instant('menu.sysManage.user')
        },
        {
          name: 'strategy',
          icon: 'compass',
          url: '/main/system/strategy',
          label: this.translate.instant('menu.sysManage.strategy')
        },
        {
          name: 'version',
          icon: 'pic-center',
          url: '/main/system/versionInfo',
          label: this.translate.instant('menu.sysManage.version')
        },
        {
          name: 'snmp',
          icon: 'link',
          url: '/main/system/snmp',
          label: this.translate.instant('menu.sysManage.snmp')
        },
        {
          name: 'alarm',
          icon: 'alert',
          url: '/main/system/alarmRule',
          label: this.translate.instant('menu.sysManage.alarm')
        },
        {
          name: 'journalCenter',
          icon: 'global',
          url: '/main/system/log',
          label: this.translate.instant('menu.sysManage.journalCenter')
        },
        {
          name: 'license',
          icon: 'security-scan',
          url: '/main/system/license',
          label: this.translate.instant('menu.sysManage.license')
        },
        {
          name: 'certificate',
          icon: 'insurance',
          url: '/main/system/certificate',
          label: this.translate.instant('menu.sysManage.certificate')
        },
        {
          name: 'haConfig',
          icon: 'database',
          url: '/main/system/haConfig',
          label: this.translate.instant('menu.sysManage.haConfig')
        },
        {
          name: 'port',
          icon: 'export',
          url: '/main/system/port',
          label: this.translate.instant('menu.sysManage.port')
        },
        {
          name: 'backup',
          icon: 'copy',
          url: '/main/system/backupConfig',
          label: this.translate.instant('menu.sysManage.backup')
        },
        {
          name: 'subscrption',
          icon: 'book',
          url: '/main/system/subscrption',
          label: this.translate.instant('menu.sysManage.subscrption')
        }
      ]
    },
    {
      label: this.translate.instant('menu.clusterManage.name'),
      children: [
        {
          name: 'dashboard',
          icon: 'dashboard',
          url: '/main/cluster/overview',
          label: this.translate.instant('menu.clusterManage.overview')
        },
        {
          name: 'pool',
          icon: 'cloud',
          url: '/main/cluster/blockStorage/pool',
          label: this.translate.instant('menu.clusterManage.storagePool')
        },
        {
          name: 'blockStorage',
          icon: 'inbox',
          url: '/main/cluster/blockStorage/volume',
          label: this.translate.instant('menu.clusterManage.blockStorage')
        },
        {
          name: 'fileStorage',
          icon: 'file',
          url: '/main/cluster/fileStorage/configLeader',
          label: this.translate.instant('menu.clusterManage.fileStorage')
        },
        {
          name: 'topology',
          icon: 'share-alt',
          url: '/main/cluster/system/topology',
          label: this.translate.instant('menu.clusterManage.topology')
        },
        {
          name: 'server',
          icon: 'layout',
          url: '/main/cluster/system/server',
          label: this.translate.instant('menu.clusterManage.server')
        },
        {
          name: 'switch',
          icon: 'fork',
          url: '/main/cluster/system/switch',
          label: this.translate.instant('menu.clusterManage.switch')
        },
        {
          name: 'disk',
          icon: 'wallet',
          url: '/main/cluster/system/disk',
          label: this.translate.instant('menu.clusterManage.disk')
        },
        {
          name: 'cachePool',
          icon: 'gold',
          url: '/main/cluster/system/cachePool',
          label: this.translate.instant('menu.clusterManage.cachePool')
        },
        {
          name: 'performance',
          icon: 'line-chart',
          url: '/main/cluster/performance/clusterPerformance',
          label: this.translate.instant('menu.clusterManage.performance')
        },
        {
          name: 'sysAlarm',
          icon: 'alert',
          url: '/main/cluster/alarm/currentAlarm',
          label: this.translate.instant('menu.clusterManage.alarm')
        },
        {
          name: 'log',
          icon: 'file-pdf',
          url: '/main/cluster/moniter/log',
          label: this.translate.instant('menu.clusterManage.log')
        },
        {
          name: 'taskList',
          icon: 'tags',
          url: '/main/cluster/moniter/taskList',
          label: this.translate.instant('menu.clusterManage.taskList')
        },
        {
          name: 'config',
          icon: 'setting',
          url: '/main/cluster/config/upgrade',
          label: this.translate.instant('menu.clusterManage.config')
        }
      ]
    }
  ];
  menuList: any[] = JSON.parse(JSON.stringify(this.s_menus));
  @Output() closePanel = new EventEmitter<boolean>();
  searchValue: string = '';
  debounceTimer: any;

  constructor(private translate: TranslateService, public storageService: StorageService) {
  }

  ngOnInit() {
  }

  close() {
    this.closePanel.emit(true);
  }

  pickMenu(event: any, item: any) {
    event.stopPropagation();
    const itemIndex = this.storageService.pickedMenus.findIndex(menu => menu.name === item.name);
    if (itemIndex !== -1) {
      this.storageService.pickedMenus.splice(itemIndex, 1);
    } else {
      if (this.storageService.pickedMenus.length >= 5) {
        return;
      }
      this.storageService.pickedMenus.push(item);
    }
    this.storageService.setPickedMenus();
  }

  isPicked(item: any) {
    return this.storageService.pickedMenus.length === 0 ? false :
        this.storageService.pickedMenus.map(x => x.name).includes(item.name);
  }

  rollbackPicked() {
    this.storageService.pickedMenus = [];
    this.storageService.setPickedMenus();
  }

  searchChange() {
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    this.debounceTimer = setTimeout(() => {
      for (let i = 0; i < this.menuList.length; i++) {
        this.menuList[i].children = this.s_menus[i].children.filter(item => item.label.includes(this.searchValue));
      }
      this.debounceTimer = undefined;
    }, 1000);
  }

}
