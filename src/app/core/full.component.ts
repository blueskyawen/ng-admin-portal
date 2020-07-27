import { Component, OnInit } from '@angular/core';
import {StorageService} from './storage.service';
import {Router, NavigationEnd} from '@angular/router';
import {LoginService} from '../login/login.service';
import { filter } from 'rxjs/operators';

@Component({
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.less']
})
export class FullComponent implements OnInit {
  lang: string;
  userName = 'admin';
  showSidebar = false;
  menuConfig: any = {
    dashboard: {url: '/main/dashboard'},
    sysManage: {url: '/main/system/profile'},
    clusterManage: {url: '/main/cluster'}
  };
  curMenu: string;
  menuMap: any = {
    dashboard: 'dashboard',
    system: 'sysManage',
    cluster: 'clusterManage'
  };
  sideBarShowMap = ['sysManage', 'clusterManage'];

  constructor(public storageService: StorageService, private router: Router,
              private loginService: LoginService) {
    this.lang = this.storageService.getAppLanguage();
    this.curMenu = 'dashboard';
    this.initObserveUrl();

  }

  ngOnInit() {
  }

  langSelectStyle(lang: string) {
    return {
      'display': 'flex',
      'align-items': 'center',
      'padding': '5px 16px',
      'color': this.lang === lang ? '#108ee9' : 'rgba(0,0,0,.65)'
    }
  }

  initObserveUrl() {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.curMenu = event.url ? this.menuMap[event.url.split('/')[2]] : 'dashboard';
        this.showSidebar = this.sideBarShowMap.includes(this.curMenu);
        setTimeout(() => {
          this.storageService.emitUrl(event.url);
        })
      });
  }

  switchLang() {
    if (this.lang === 'zh') {
      this.storageService.setAppLanguage('en');
      this.storageService.lang = 'en';
    } else {
      this.storageService.setAppLanguage('zh');
      this.storageService.lang = 'zh';
    }
    location.reload();
  }

  loginOut() {
    this.loginService.userLoginout({user: this.userName}).subscribe((res: any) => {
      this.router.navigate(['/login']);
    });
  }

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
    this.storageService.emitSideBarShow(this.showSidebar ? 'show' : 'hide');
  }

  clickMenu(menuType: string) {
    this.curMenu = menuType;
    this.showSidebar = this.sideBarShowMap.includes(this.curMenu);
    this.router.navigate([this.menuConfig[menuType].url]);
  }
}
