import {Component, EventEmitter, OnInit, Output, Input} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ValidatorFn
} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { SystemManageService } from '../system-manage.service';
import {LoginService} from '../../login/login.service';

@Component({
  selector: 'add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.less']
})
export class AddUserComponent implements OnInit {
  @Input() type: string;
  @Input() userData: any;
  @Output() addUserChange = new EventEmitter<string>();
  validateForm: FormGroup;
  reqData = {};
  addLoading: boolean = false;
  addBtnTitle: string = this.translate.instant('add');
  userNames: string[] = [];
  clusterOptions: any[] = [];
  clusters = [];

  constructor(private fb: FormBuilder, private translate: TranslateService,
              private notification: NzNotificationService, private loginService: LoginService,
              private systemManageService: SystemManageService) { }

  ngOnInit() {
    this.initForm();
    this.peraDataForUserAdd();
  }

  initForm() {
    if (this.type === 'add') {
      this.validateForm = this.fb.group({
        userName         : [ null, [ Validators.required, this.checkNameValidator] ],
        password         : [ null, [ Validators.required ] ],
        checkPassword    : [ null, [ Validators.required, this.confirmationValidator ] ],
        phoneNumberPrefix: [ '+86' ],
        phoneNumber      : [ null, [ Validators.required, Validators.pattern(/^1\d{10}$/) ] ],
        email            : [ null, [ Validators.email ] ],
        clusters         : [ null ]
      });
      this.addBtnTitle = this.translate.instant('add');
    }
    if (this.type === 'edit') {
      this.validateForm = this.fb.group({
        userName         : [ this.userData.name, [ Validators.required, this.checkNameValidator] ],
        phoneNumberPrefix: [ '+86' ],
        phoneNumber      : [ this.userData.phone, [ Validators.required, Validators.pattern(/^1\d{10}$/) ] ],
        email            : [ this.userData.email, [ Validators.email ] ],
        clusters         : [ this.userData.clusters ]
      });
      this.addBtnTitle = this.translate.instant('save');
    }
  }

  peraDataForUserAdd() {
    this.systemManageService.getUsersAndCluster().subscribe((res: any) => {
      if (this.type === 'add') {
        this.userNames = res.userNames;
      } else {
        this.userNames = res.userNames.filter(x => x !== this.userData.name);
        this.clusters = this.userData.clusters;
      }
      this.clusterOptions = res.clusters;
    });
  }

  submitForm(): void {
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }

    if (this.isValidAdd()) {
      if (this.type === 'add') {
        this.sendToUserAdd();
      } else {
        this.sendToUserEdit();
      }
    }
  }

  isValidAdd() {
    return this.validateForm.valid && !this.validateForm.errors;
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

  sendToUserAdd() {
    this.reqData = {
      'name': this.validateForm.get('userName').value,
      'password': this.validateForm.get('password').value,
      'phone': this.validateForm.get('phoneNumber').value,
      'email': this.validateForm.get('email').value,
      'agree': true,
      'role': 'operator',
      'clusters': this.clusters,
      'createTime': (new Date()).toString().split('(')[0]
    };
    this.addLoading = true;
    this.addBtnTitle = this.translate.instant('adding');
    this.loginService.userRegister(this.reqData).subscribe((res: any) => {
      this.notification.create('success', this.translate.instant('addMsg'), '');
      setTimeout(() => {
        this.addUserChange.emit('success');
      }, 3000);
    }, error => {
      this.addLoading = false;
      this.addBtnTitle = this.translate.instant('add');
    });
  }

  sendToUserEdit() {
    this.reqData = {
      'name': this.validateForm.get('userName').value,
      'password': this.userData.password,
      'phone': this.validateForm.get('phoneNumber').value,
      'email': this.validateForm.get('email').value,
      'clusters': this.clusters,
    };
    this.addLoading = true;
    this.addBtnTitle = this.translate.instant('saving');
    this.systemManageService.editUserData(this.reqData).subscribe((res: any) => {
      this.notification.create('success', this.translate.instant('successMsg'), '');
      setTimeout(() => {
        this.addUserChange.emit('success');
      }, 3000);
    }, error => {
      this.addLoading = false;
      this.addBtnTitle = this.translate.instant('save');
    });
  }

  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  cancel() {
    this.addUserChange.emit('cancel');
  }

}
