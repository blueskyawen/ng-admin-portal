import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {StorageService} from './core';
import { en_US, zh_CN, NzI18nService } from 'ng-zorro-antd'
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cephportal';
  lang: string;
  noticeObj: any;

  constructor(private translate: TranslateService, public storageService: StorageService,
              private nzI18nService: NzI18nService) {
    this.setAppDefaultLang();
  }

  setAppDefaultLang() {
    if (this.storageService.getAppLanguage() !== undefined) {
      this.lang = this.storageService.getAppLanguage();
    } else {
      const browserLang = this.translate.getBrowserLang();
      this.lang = browserLang === 'zh' ? 'zh' : 'en';
    }
    this.translate.setDefaultLang(this.lang);
    this.translate.use(this.lang);
    this.nzI18nService.setLocale(this.lang === 'zh' ? zh_CN : en_US);
    $('#langTranslate').attr('lang', this.lang);
  }

}
