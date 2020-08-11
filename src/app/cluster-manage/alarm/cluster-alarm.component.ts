import { Component, OnInit } from '@angular/core';
import {ClusterManageService} from "../cluster-manage.service";
import {TranslateService} from "@ngx-translate/core";
import {NzModalService, NzNotificationService} from "ng-zorro-antd";

@Component({
  selector: 'cluster-alarm',
  templateUrl: './cluster-alarm.component.html',
  styleUrls: ['./cluster-alarm.component.less']
})
export class ClusterAlarmComponent implements OnInit {
  alarmList: any[] = [];
  allChecked = false;
  indeterminate = false;
  displayData = [];
  checkedNumber = 0;
  deleteWaiting = false;
  sortData = {name: null, value: null};
  displayAlarms = [];
  gradeColor = {
    "critical": 'red',
    "serious": 'magenta',
    "warning":'orange',
    "prompt": 'purple'
  };

  constructor(private clusterManageService: ClusterManageService,
              private translate: TranslateService, private notification: NzNotificationService,
              private modalService: NzModalService) { }

  ngOnInit() {
    this.getAlarms();
  }

  getAlarms() {
    this.clusterManageService.getCurAlarms('all').subscribe((res: any) => {
      this.alarmList = res.alarms.map(alarm => {
        alarm.grade_s = this.translate.instant(`alarm.${alarm.grade}`);
        return alarm;
      });
      this.displayAlarms = [...this.alarmList];
    });
  }

  sort(sort: { key: string, value: string }): void {
    this.sortData.name = sort.key;
    this.sortData.value = sort.value;
    this.search();
  }

  search(): void {
    if (this.sortData.name && this.sortData.value) {
      this.displayAlarms = this.alarmList.sort((a, b) => (this.sortData.value === 'ascend') ? (a[ this.sortData.name ] > b[ this.sortData.name ] ? 1 : -1) : (b[ this.sortData.name ] > a[ this.sortData.name ] ? 1 : -1));
    } else {
      this.displayAlarms = [...this.alarmList];
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
    this.checkedNumber = this.displayAlarms.filter(value => value.checked).length;
  }

  checkAll(value: boolean): void {
    this.displayData.forEach(data => {
      if (!data.disabled) {
        data.checked = value;
      }
    });
    this.refreshStatus();
  }

}
