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
  reqData = {
    "name": "",
    "password": "",
    "phone": "",
    "email": "",
    "agree": true,
    "role": "operator",
    "clusters": [],
    "createTime": ""
  };
  addLoading: boolean = false;
  addBtnTitle: string = this.translate.instant('add');
  userNames: string[] = [];
  clusterOptions: any[] = [];
  clusters = [];

  constructor(private fb: FormBuilder, private translate: TranslateService,
              private notification: NzNotificationService, private loginService: LoginService,
              private systemManageService: SystemManageService) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      userName         : [ null, [ Validators.required, this.checkNameValidator] ],
      password         : [ null, [ Validators.required ] ],
      checkPassword    : [ null, [ Validators.required, this.confirmationValidator ] ],
      phoneNumberPrefix: [ '+86' ],
      phoneNumber      : [ null, [ Validators.required, Validators.pattern(/^1\d{10}$/) ] ],
      email            : [ null, [ Validators.email ] ],
      clusters         : [ null ]
    });
    this.peraDataForUserAdd();
  }

  peraDataForUserAdd() {
    this.systemManageService.getUsersAndCluster().subscribe((res: any) => {
      this.userNames = res.userNames;
      this.clusterOptions = res.clusters;
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }

    if (this.isValidAdd()) {
      this.sendToUserAdd();
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
  };

  checkNameValidator = (control: FormControl): { [ s: string ]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (!/^\w{3,10}$/.test(control.value)) {
      return { invalid: true, error: true };
    } else if (this.userNames.includes(control.value)) {
      return { exist: true, error: true };
    }
  };

  sendToUserAdd() {
    this.reqData = {
      "name": this.validateForm.get('userName').value,
      "password": this.validateForm.get('password').value,
      "phone": this.validateForm.get('phoneNumber').value,
      "email": this.validateForm.get('email').value,
      "agree": true,
      "role": "operator",
      "clusters": this.clusters,
      "createTime": (new Date()).toString().split('(')[0]
    };
    this.addLoading = true;
    this.addBtnTitle = this.translate.instant('adding');
    this.loginService.userRegister(this.reqData).subscribe((res: any) => {
      this.notification.create('success', this.translate.instant('addMsg'),'');
      setTimeout(() => {
        this.addUserChange.emit('success');
      }, 3000);
    }, error => {
      this.addLoading = false;
      this.addBtnTitle = this.translate.instant('add');
    });
  }

  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  cancel() {
    this.addUserChange.emit('cancel');
  }

}
