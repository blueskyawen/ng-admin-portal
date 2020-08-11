import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ValidatorFn
} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {LoginService} from './login.service';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {
  validateForm: FormGroup;
  reqData = {
    'name': '',
    'password': '',
    'phone': '',
    'email': '',
    'agree': true,
    'role': 'operator',
    'clusters': [],
    'createTime': ''
  };
  registerLoading: boolean = false;
  registerBtnTitle: string = this.translate.instant('login.register');
  userNames: string[] = [];

  constructor(private fb: FormBuilder, private loginService: LoginService,
              private translate: TranslateService, private notification: NzNotificationService) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      userName         : [ null, [ Validators.required, this.checkNameValidator] ],
      password         : [ null, [ Validators.required ] ],
      checkPassword    : [ null, [ Validators.required, this.confirmationValidator ] ],
      phoneNumberPrefix: [ '+86' ],
      phoneNumber      : [ null, [ Validators.required, Validators.pattern(/^1\d{10}$/) ] ],
      email            : [ null, [ Validators.email ] ],
      agree            : [ true ]
    });
    this.getUserList();
  }

  getUserList() {
    this.loginService.getUserList().subscribe((res: any) => {
      this.userNames = res.users.map(user => user.name);
    });
  }

  submitForm(): void {
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }

    if (this.isValidRegister()) {
      this.putUserRegister();
    }
  }

  isValidRegister() {
    return this.validateForm.valid && !this.validateForm.errors;
  }

  putUserRegister() {
    this.reqData = {
      'name': this.validateForm.get('userName').value,
      'password': this.validateForm.get('password').value,
      'phone': this.validateForm.get('phoneNumber').value,
      'email': this.validateForm.get('email').value,
      'agree': this.validateForm.get('agree').value,
      'role': 'operator',
      'clusters': [],
      'createTime': (new Date()).toString().split('(')[0]
    };
    this.registerLoading = true;
    this.registerBtnTitle = this.translate.instant('login.registering');
    this.loginService.userRegister(this.reqData).subscribe((res: any) => {
      this.notification.create('success', this.translate.instant('login.registerSucesss'), '');
      setTimeout(() => {
        this.cancel();
      }, 3000);
    }, error => {
      this.registerLoading = false;
      this.registerBtnTitle = this.translate.instant('login.register');
    });
  }

  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [ s: string ]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    // tslint:disable-next-line
  };

  checkNameValidator = (control: FormControl): { [ s: string ]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (!/^\w{3,10}$/.test(control.value)) {
      return { invalid: true, error: true };
    } else if (this.userNames.includes(control.value)) {
      return { exist: true, error: true };
    }
    // tslint:disable-next-line
  };

  cancel() {
    history.back();
  }

}
