import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  lang: any = 'zh';
  public currentUrl$ = new Subject<string>();
  public sideBarShow$ = new Subject<string>();
  public pickedMenus: any[] = [];

  constructor(private translate: TranslateService) {
    if (this.getLocalStorage('pickedMenus')) {
      this.pickedMenus = JSON.parse(this.getLocalStorage('pickedMenus'));
    }
  }

  getAppLanguage(): any {
    if (this.getLocalStorage('cephLang') !== undefined) {
      return this.getLocalStorage('cephLang');
    } else {
      const browserLang = this.translate.getBrowserLang();
      return browserLang === 'zh' ? 'zh' : 'en';
    }
  }

  setAppLanguage(lang: string): void {
    this.setLocalStorage('cephLang', lang);
  }

  setPickedMenus() {
    this.setLocalStorage('pickedMenus', JSON.stringify(this.pickedMenus));
  }

  setLocalStorage(key: string, value: string) {
    window.localStorage[key] = value;
  }

  getLocalStorage(key: string, pare ?: boolean) {
    return window.localStorage[key];
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
