import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {StorageService} from '../core';
import {window} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {LoginService} from './login.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd';

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
  langTitle = '英文';
  validateForm: FormGroup;
  loginLoading: boolean = false;
  loginBtnLabel: string = this.translate.instant('login.login');

  constructor(private router: Router, public storageService: StorageService,
              private loginService: LoginService, private translate: TranslateService,
              private fb: FormBuilder, private notification: NzNotificationService) {
    if (this.storageService.getAppLanguage() === 'en') {
      this.langTitle = 'Chinese';
    } else {
      this.langTitle = '英文';
    }
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ],
      remember: [ true ]
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    if (this.isValidLogin()) {
      this.goLogin();
    }
  }

  isValidLogin() {
    return this.validateForm.valid && !this.validateForm.errors;
  }

  goLogin() {
    this.loginData = {
      name: this.validateForm.get('userName').value,
      password: this.validateForm.get('password').value,
      remember: this.validateForm.get('remember').value,
    };
    this.loginLoading = true;
    this.loginBtnLabel = this.translate.instant('login.logining');
    this.loginService.userLoginin(this.loginData).subscribe((res: any) => {
      this.router.navigate(['/main/dashboard']);
      this.notification.create('success', this.translate.instant('login.loginSucesss'),'')
    }, error => {
      this.loginLoading = false;
      this.loginBtnLabel = this.translate.instant('login.login');
    });
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
