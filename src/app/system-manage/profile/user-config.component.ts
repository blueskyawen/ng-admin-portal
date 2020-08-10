import { Component, OnInit } from '@angular/core';
import { SystemManageService } from '../system-manage.service';
import {StorageService} from '../../core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ValidatorFn
} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import { NzNotificationService } from 'ng-zorro-antd';
import {Router} from '@angular/router';

@Component({
  selector: 'user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.less']
})
export class UserConfigComponent implements OnInit {
  userData: any;
  validateForm: FormGroup;

  editLoading: boolean = false;
  editBtnTitle: string = this.translate.instant('save');

  constructor(private systemManageService: SystemManageService, private router: Router,
              private storageService: StorageService, private fb: FormBuilder,
              private translate: TranslateService, private notification: NzNotificationService) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      password         : [ null, [ Validators.required ] ],
      checkPassword    : [ null, [ Validators.required, this.confirmationValidator ] ],
      phoneNumberPrefix: [ '+86' ],
      phoneNumber      : [ null, [ Validators.required, Validators.pattern(/^1\d{10}$/) ] ],
      email            : [ null, [ Validators.email ] ]
    });
    let userId = this.storageService.getLocalStorage('loginUserId');
    this.systemManageService.getUserData(userId).subscribe((res: any) => {
      this.userData = res;
      this.initFromData();
    });
  }

  initFromData() {
    this.validateForm.get('phoneNumber').setValue(this.userData.phone);
    this.validateForm.get('email').setValue(this.userData.email);
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }

    if (this.isValidRegister()) {
      this.putUserModify();
    }
  }

  putUserModify() {
    let reqData = {
      "name": this.userData.name,
      "password": this.validateForm.get('password').value,
      "phone": this.validateForm.get('phoneNumber').value,
      "email": this.validateForm.get('email').value,
      "clusters": this.userData.clusters
    };
    this.editLoading = true;
    this.editBtnTitle = this.translate.instant('saving');
    this.systemManageService.editUserData(reqData).subscribe((res: any) => {
      this.notification.create('success', this.translate.instant('login.editSucesss'),'');
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 3000);
    }, error => {
      this.editLoading = false;
      this.editBtnTitle = this.translate.instant('save');
    });
  }

  isValidRegister() {
    return this.validateForm.valid && !this.validateForm.errors;
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
  };

}
