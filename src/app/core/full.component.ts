import { Component, OnInit } from '@angular/core';
import {StorageService} from './storage.service';
import {Router, NavigationEnd} from '@angular/router';
import {LoginService} from '../login/login.service';
import {TranslateService} from '@ngx-translate/core';
import { filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.less']
})
export class FullComponent implements OnInit {
  lang: string;
  userName = 'admin';
  showSidebar = false;
  curMenu: string;
  curUrl: string;
  menuMap: any = {
    dashboard: 'dashboard',
    system: 'sysManage',
    cluster: 'clusterManage'
  };
  sideBarShowMap = ['sysManage', 'clusterManage'];
  showPanel: boolean = false;

  constructor(public storageService: StorageService, private router: Router,
              private loginService: LoginService, private translate: TranslateService,
              private http: HttpClient) {
    this.lang = this.storageService.getAppLanguage();
    this.initObserveUrl();

  }

  ngOnInit() {
    this.http.get('/api/author/curUser').subscribe((res: any) => {
      this.userName = res.name;
      this.storageService.setLocalStorage('loginUser', this.userName);
    });
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
        this.curUrl = event.url;
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
    let reqData = {
      user: this.userName,
      lastLogin: (new Date()).toString().split('(')[0]
    };
    this.loginService.userLoginout(reqData).subscribe((res: any) => {
      this.router.navigate(['/login']);
    });
  }

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
    this.storageService.emitSideBarShow(this.showSidebar ? 'show' : 'hide');
  }

  toHelp() {
    window.open("http://github.com/blueskyawen/ng-admin-portal")
  }

}
