import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {StorageService, NoticeReportService} from './core';

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
              public noticeReportService: NoticeReportService) {
    this.setAppDefaultLang();
    this.initNoticeReport();
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
    $('#langTranslate').attr('lang', this.lang);
  }

  initNoticeReport() {
    this.noticeReportService.getNoticeReport().subscribe((notice: any) => {
      if (notice.type === 'success') {
        this.noticeObj = {type: 'success', title: notice.title || this.translate.instant('success'),
          detail: notice.msg || this.translate.instant('successMsg')};
      } else if (notice.type === 'error') {
        this.noticeObj = {type: 'error', title: notice.title || this.translate.instant('error'),
          detail: notice.msg || this.translate.instant('errorMsg')};
      } else {
        this.noticeObj = {type: 'warning', title: notice.title || this.translate.instant('warn'),
          detail: notice.msg || this.translate.instant('warnMsg')};
      }
    });
  }

}
