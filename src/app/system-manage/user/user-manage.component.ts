import { Component, OnInit } from '@angular/core';
import { SystemManageService } from '../system-manage.service';
import {StorageService} from '../../core';
import {TranslateService} from '@ngx-translate/core';
import { NzNotificationService } from 'ng-zorro-antd';

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

  constructor(private systemManageService: SystemManageService, private storageService: StorageService,
              private translate: TranslateService, private notification: NzNotificationService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.systemManageService.getUsers().subscribe((res: any) => {
      this.users = res.map(item => {
        item.manageClusters = item.clusterNames.length !== 0 ? item.clusterNames.join('\n') : '--';
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
    this.deleteWaiting = true;
    setTimeout(_ => {
      this.displayUsers.forEach(value => value.checked = false);
      this.refreshStatus();
      this.deleteWaiting = false;
      this.notification.create('success', this.translate.instant('deleteMsg'),'');
    }, 2000);
  }

  toUserAdd() {

  }

  deleteUser(item: any) {

  }

}
