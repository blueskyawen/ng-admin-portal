import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import {NoticeReport} from "./notice-report.service";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  lang: any = 'zh';
  public currentUrl$ = new Subject<string>();
  public sideBarShow$ = new Subject<string>();
  constructor(private translate: TranslateService) {
  }

  getAppLanguage(): any {
    if (window.localStorage['cephLang'] !== undefined) {
      return window.localStorage['cephLang'];
    } else {
      const browserLang = this.translate.getBrowserLang();
      return browserLang === 'zh' ? 'zh' : 'en';
    }
  }

  setAppLanguage(lang: string): void {
    window.localStorage['cephLang'] = lang;
  }

  getCurrentUrlSub(): any {
    return this.currentUrl$;
  }

  emitUrl(url: string) {
    this.currentUrl$.next(url);
  }

  getSideBarShowSub(): any {
    return this.sideBarShow$;
  }

  emitSideBarShow(type: string) {
    this.sideBarShow$.next(type);
  }
}
