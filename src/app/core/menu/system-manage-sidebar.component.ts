import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {StorageService} from '../storage.service';
import {Router} from '@angular/router';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'system-manage-sidebar',
  templateUrl: './system-manage-sidebar.component.html',
  styleUrls: ['./sidebar.less']
})
export class SystemManageSidebarComponent implements OnInit {
  sidebarCfgs: any[] = [
    {
      name: 'profile',
      icon: 'user',
      active: true,
      url: '/main/system/profile',
      label: this.translate.instant('menu.sysManage.profile')
    },
    {
      name: 'user',
      icon: 'team',
      active: false,
      url: '/main/system/user',
      label: this.translate.instant('menu.sysManage.user')
    },
    {
      name: 'strategy',
      icon: 'compass',
      active: false,
      url: '/main/system/strategy',
      label: this.translate.instant('menu.sysManage.strategy')
    },
    {
      name: 'version',
      icon: 'pic-center',
      active: false,
      label: this.translate.instant('menu.sysManage.version'),
      children: [
        {
          name: 'versionInfo',
          active: false,
          url: '/main/system/versionInfo',
          label: this.translate.instant('menu.sysManage.versionInfo')
        },
        {
          name: 'versionUpgrade',
          active: false,
          url: '/main/system/versionUpgrade',
          label: this.translate.instant('menu.sysManage.versionUpgrade')
        },
      ]
    },
    {
      name: 'snmp',
      icon: 'link',
      active: false,
      url: '/main/system/snmp',
      label: this.translate.instant('menu.sysManage.snmp')
    },
    {
      name: 'alarm',
      icon: 'alert',
      active: false,
      label: this.translate.instant('menu.sysManage.alarm'),
      children: [
        {
          name: 'alarmRule',
          active: false,
          url: '/main/system/alarmRule',
          label: this.translate.instant('menu.sysManage.alarmRule')
        },
        {
          name: 'smtp',
          active: false,
          url: '/main/system/smtp',
          label: this.translate.instant('menu.sysManage.smtp')
        },
        {
          name: 'alarmStragery',
          active: false,
          url: '/main/system/alarmStragery',
          label: this.translate.instant('menu.sysManage.alarmStragery')
        }
      ]
    },
    {
      name: 'journalCenter',
      icon: 'global',
      active: false,
      label: this.translate.instant('menu.sysManage.journalCenter'),
      children: [
        {
          name: 'log',
          active: false,
          url: '/main/system/log',
          label: this.translate.instant('menu.sysManage.log')
        },
        {
          name: 'systemLog',
          active: false,
          url: '/main/system/systemLog',
          label: this.translate.instant('menu.sysManage.systemLog')
        },
        {
          name: 'logStragery',
          active: false,
          url: '/main/system/logStragery',
          label: this.translate.instant('menu.sysManage.logStragery')
        }
      ]
    },
    {
      name: 'license',
      icon: 'security-scan',
      active: false,
      url: '/main/system/license',
      label: this.translate.instant('menu.sysManage.license')
    },
    {
      name: 'certificate',
      icon: 'insurance',
      active: false,
      url: '/main/system/certificate',
      label: this.translate.instant('menu.sysManage.certificate')
    },
    {
      name: 'haConfig',
      icon: 'database',
      active: false,
      url: '/main/system/haConfig',
      label: this.translate.instant('menu.sysManage.haConfig')
    },
    {
      name: 'port',
      icon: 'export',
      active: false,
      url: '/main/system/port',
      label: this.translate.instant('menu.sysManage.port')
    },
    {
      name: 'backup',
      icon: 'copy',
      active: false,
      label: this.translate.instant('menu.sysManage.backup'),
      children: [
        {
          name: 'backupConfig',
          active: false,
          url: '/main/system/backupConfig',
          label: this.translate.instant('menu.sysManage.backupConfig')
        },
        {
          name: 'backupData',
          active: false,
          url: '/main/system/backupData',
          label: this.translate.instant('menu.sysManage.backupData')
        },
        {
          name: 'backupPolicy',
          active: false,
          url: '/main/system/backupPolicy',
          label: this.translate.instant('menu.sysManage.backupPolicy')
        }
      ]
    },
    {
      name: 'subscrption',
      icon: 'book',
      active: false,
      url: '/main/system/subscrption',
      label: this.translate.instant('menu.sysManage.subscrption')
    }
  ];

  constructor(private translate: TranslateService, public storageService: StorageService,
              private router: Router) { }

  ngOnInit() {
    this.storageService.getCurrentUrlSub().subscribe((res: any) => {
      if (res.includes('/main/system')) {
        this.checkMenuActive(res)
      }
    });
  }

  checkMenuActive(url: string) {
    this.clearActive();
    for (const item of this.sidebarCfgs) {
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

  clickSecondMenu(item: any) {
    if (!item.children) {
      this.router.navigate([item.url]);
    } else {
      item.expand = !item.expand;
    }
  }

  clearActive() {
    for (const item of this.sidebarCfgs) {
      item.active = false;
      if (item.children) {
        for (const item2 of item.children) {
          item2.active = false;
        }
      }
    }
  }

  checkParentActive() {
    for (const item of this.sidebarCfgs) {
      if (item.children && item.children.find(x => x.active)) {
        item.active = true;
        item.expand = item.active;
        return;
      }
    }
  }

}
