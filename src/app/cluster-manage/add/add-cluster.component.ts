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
import { ClusterManageService } from '../cluster-manage.service';

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
  versionOptions = [
    {label: 'V1.x', value: 'v1'},
    {label: 'V2.x', value: 'v2'},
    {label: 'V3.x', value: 'v3'}
  ];
  clusterNames: string[] = [];

  constructor(private fb: FormBuilder, private translate: TranslateService,
              private notification: NzNotificationService,
              private clusterManageService: ClusterManageService) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      clusterName      : [ null, [ Validators.required, this.checkNameValidator] ],
      publicNet        : [ null, [ Validators.required ] ],
      network          : [ null, [ Validators.required ] ],
      version          : [ null, [ Validators.required ] ],
      description      : [ null ]
    });
    this.getClusterList();
  }

  getClusterList() {
    this.clusterManageService.getClusterList().subscribe((res: any) => {
      this.clusterNames = res.clusters.map(item => item.name);
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

  checkNameValidator = (control: FormControl): { [ s: string ]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (!/^\w{3,10}$/.test(control.value)) {
      return { invalid: true, error: true };
    } else if (this.clusterNames.includes(control.value)) {
      return { exist: true, error: true };
    }
  };

  sendClusterAdd() {
    this.reqData = {
      "name": this.validateForm.get('clusterName').value,
      "publicNet": this.validateForm.get('publicNet').value,
      "network": this.validateForm.get('network').value,
      "version": this.validateForm.get('version').value,
      "description": this.validateForm.get('description').value
    };
    this.addLoading = true;
    this.addBtnTitle = this.translate.instant('adding');
    this.clusterManageService.postAddCluster(this.reqData).subscribe((res: any) => {
      this.notification.create('success', this.translate.instant('dashboard.cluster.addSuccess'),'');
      this.addClusterChange.emit('success');
    }, error => {
      this.addLoading = false;
      this.addBtnTitle = this.translate.instant('add');
    });
  }

  cancel() {
    this.addClusterChange.emit('cancel');
  }

}
