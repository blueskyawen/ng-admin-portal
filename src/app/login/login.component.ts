import { Component, OnInit } from '@angular/core';
import { PxButtonState } from 'paletxUI';
import {Router} from '@angular/router';
import {NoticeReportService, StorageService} from '../core';
import {window} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {LoginService} from './login.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  loginData: any = {
    name: '',
    password: '',
    remember: false
  };
  buttonState: number = PxButtonState.SUCCESS;
  langTitle = '英文';

  constructor(private router: Router, public storageService: StorageService,
              private loginService: LoginService, private noticeReportService: NoticeReportService,
              private translate: TranslateService) {
    if (this.storageService.getAppLanguage() === 'en') {
      this.langTitle = 'Chinese';
    } else {
      this.langTitle = '英文';
    }
  }

  ngOnInit() {
  }

  goLogin() {
    this.buttonState = PxButtonState.DOING;
    this.loginService.userLoginin(this.loginData).subscribe((res: any) => {
      this.buttonState = PxButtonState.SUCCESS;
      this.router.navigate(['/main/dashboard']);
      this.noticeReportService.reportSucess({title: this.translate.instant('login.loginSucesss')});
    }, error => {
      this.buttonState = PxButtonState.SUCCESS;
    });
  }

  isValid() {
    return this.loginData.name && this.loginData.password;
  }

  switchLang() {
    if (this.storageService.getAppLanguage() === 'zh') {
      this.storageService.setAppLanguage('en');
      this.storageService.lang = 'en';
    } else {
      this.storageService.setAppLanguage('zh');
      this.storageService.lang = 'zh';
    }
    location.reload();
  }

}
