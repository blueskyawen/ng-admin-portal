import { Component, OnInit } from '@angular/core';
import { SystemManageService } from '../system-manage.service';
import {StorageService} from '../../core';
import {TranslateService} from '@ngx-translate/core';
import { NzNotificationService, NzModalService } from 'ng-zorro-antd';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  ValidatorFn
} from '@angular/forms';

@Component({
  selector: 'user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.less']
})
export class UserManageComponent implements OnInit {
  users: any[] = [];
  allChecked = false;
  indeterminate = false;
  displayData = [];
  disabledUserDel = true;
  checkedNumber = 0;
  deleteWaiting = false;
  sortData = {name: null, value: null};
  displayUsers = [];
  operType: string = 'add';
  editData: any;
  drawTitle: string;
  visible = false;

  showClusterAdd = false;
  operUser: any;
  clusterOptions: any[] = [];
  clusters = [];
  addClusterForm: FormGroup;

  constructor(private systemManageService: SystemManageService, private storageService: StorageService,
              private translate: TranslateService, private notification: NzNotificationService,
              private modalService: NzModalService, private fb: FormBuilder) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.systemManageService.getUsers().subscribe((res: any) => {
      this.users = res.map(item => {
        item.manageClusters = item.clusterNames.length !== 0 ? item.clusterNames.join(';') : '--';
        item.checked = false;
        item.disabled = item.role === 'manager';
        item.roleName = this.translate.instant(`login.${item.role}`);
        return item;
      });
      this.displayUsers = [...this.users];
    });
  }

  sort(sort: { key: string, value: string }): void {
    this.sortData.name = sort.key;
    this.sortData.value = sort.value;
    this.search();
  }

  search(): void {
    if (this.sortData.name && this.sortData.value) {
      this.displayUsers = this.users.sort((a, b) => (this.sortData.value === 'ascend') ? (a[ this.sortData.name ] > b[ this.sortData.name ] ? 1 : -1) : (b[ this.sortData.name ] > a[ this.sortData.name ] ? 1 : -1));
    } else {
      this.displayUsers = [...this.users];
    }
  }

  currentPageDataChange($event: Array<any>): void {
    this.displayData = $event;
    this.refreshStatus();
  }

  refreshStatus(): void {
    const allChecked = this.displayData.filter(value => !value.disabled).every(value => value.checked === true);
    const allUnChecked = this.displayData.filter(value => !value.disabled).every(value => !value.checked);
    this.allChecked = allChecked;
    this.indeterminate = (!allChecked) && (!allUnChecked);
    this.checkedNumber = this.displayUsers.filter(value => value.checked).length;
    this.disabledUserDel = this.checkedNumber === 0;

  }

  checkAll(value: boolean): void {
    this.displayData.forEach(data => {
      if (!data.disabled) {
        data.checked = value;
      }
    });
    this.refreshStatus();
  }

  deleteUsers(): void {
    if (this.disabledUserDel) return;
    let selectedUsers = this.displayUsers.filter(user => user.checked).map(x => x.id);
    this.modalService.confirm({
      nzTitle     : this.translate.instant('login.mutildelTitle'),
      nzContent   : '<b style="color: red;">'+ this.translate.instant('login.delTip') +'</b>',
      nzOkText    : this.translate.instant('confirm'),
      nzOkType    : 'danger',
      nzOnOk      : () => this.sureDeleteUsers(selectedUsers),
      nzCancelText: this.translate.instant('cancel'),
      nzOnCancel  : () => console.log('Cancel')
    });
  }

  toUserAdd() {
    this.operType = 'add';
    this.drawTitle = this.translate.instant('login.addUser');
    this.visible = true;
  }

  toEditUser(item: any) {
    this.operType = 'edit';
    this.drawTitle = this.translate.instant('login.editUser');
    this.editData = item;
    this.visible = true;
  }

  deleteUser(item: any) {
    this.modalService.confirm({
      nzTitle     : this.translate.instant('login.delTitle', {name: item.name}),
      nzContent   : '<b style="color: red;">'+ this.translate.instant('login.delTip') +'</b>',
      nzOkText    : this.translate.instant('confirm'),
      nzOkType    : 'danger',
      nzOnOk      : () => this.sureDeleteUsers(item.id),
      nzCancelText: this.translate.instant('cancel'),
      nzOnCancel  : () => console.log('Cancel')
    });
  }

  sureDeleteUsers(items: string[] | string) {
    let users = [];
    if (Array.isArray(items)) {
      users = items;
      this.deleteWaiting = true;
    } else {
      users = [items];
    }
    this.systemManageService.deleteClusters(users).subscribe((res: any) => {
      this.getUsers();
      if (this.deleteWaiting) {
        this.deleteWaiting = false;
      }
      this.notification.create('success', this.translate.instant('deleteMsg'),'');
    });
  }

  toAddCluster(item: any) {
    this.operUser = item;
    this.systemManageService.getClusterList().subscribe((res: any) => {
      this.clusterOptions = res.clusters.map(x => {
        return {id: x.id, name: x.name};
      });
      this.clusters = item.clusters;
      this.addClusterForm = this.fb.group({
        clusters: [ item.clusters ]
      });
      this.showClusterAdd = true;
    });
  }

  handleAddUser(result: any) {
    this.visible = false;
    if (result === 'success') {
      this.getUsers();
    }
  }

  addClusterOk(): void {
    let reqData = {
      clusters: this.clusters
    };
    this.systemManageService.editClusterToUser(this.operUser.id, reqData).subscribe((res: any) => {
      this.notification.create('success', this.translate.instant('successMsg'),'');
      this.getUsers();
      this.showClusterAdd = false;
    });
  }

  addClusterCancel(): void {
    this.clusters = [];
    this.showClusterAdd = false;
  }

}
