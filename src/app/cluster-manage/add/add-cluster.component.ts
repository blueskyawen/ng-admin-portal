import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ValidatorFn
} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'add-cluster',
  templateUrl: './add-cluster.component.html',
  styleUrls: ['./add-cluster.component.less']
})
export class AddClusterComponent implements OnInit {
  @Output() addClusterChange = new EventEmitter<string>();
  validateForm: FormGroup;
  reqData = {
    "name": "",
    "publicNet": "",
    "network": "",
    "version": "",
    "description": ""
  };
  addLoading: boolean = false;
  addBtnTitle: string = this.translate.instant('add');

  constructor(private fb: FormBuilder, private translate: TranslateService,
              private notification: NzNotificationService) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      clusterName      : [ null, [ Validators.required, Validators.pattern(/^\w{3,10}$/)] ],
      publicNet        : [ null, [ Validators.required ] ],
      network          : [ null, [ Validators.required ] ],
      version          : [ null, [ Validators.required, Validators.pattern(/^1\d{10}$/) ] ],
      description      : [ null ]
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }

    if (this.isValidRegister()) {
      this.sendClusterAdd();
    }
  }

  isValidRegister() {
    return this.validateForm.valid && !this.validateForm.errors;
  }

  sendClusterAdd() {
/*    this.reqData = {
      "name": this.validateForm.get('userName').value,
      "password": this.validateForm.get('password').value,
      "phone": this.validateForm.get('phoneNumber').value,
      "email": this.validateForm.get('email').value,
      "agree": this.validateForm.get('agree').value
    };
    this.registerLoading = true;
    this.registerBtnTitle = this.translate.instant('login.registering');
    this.loginService.userRegister(this.reqData).subscribe((res: any) => {
      this.notification.create('success', this.translate.instant('login.registerSucesss'),'');
      setTimeout(() => {
        this.cancel();
      }, 3000);
    }, error => {
      this.registerLoading = false;
      this.registerBtnTitle = this.translate.instant('login.register');
    });*/
    this.addClusterChange.emit('cancel');
  }

  cancel() {
    this.addClusterChange.emit('cancel');
  }

}
