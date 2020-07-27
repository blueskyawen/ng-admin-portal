import { Component, OnInit, Input, OnDestroy, AfterViewInit, ViewChild, SimpleChanges, ChangeDetectorRef, NgZone } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '../core';
import {Router} from "@angular/router";
import { fromEvent } from 'rxjs';

@Component({
  selector: 'cluster-dashboard',
  templateUrl: './cluster-dashboard.component.html',
  styleUrls: ['./cluster-dashboard.component.less']
})
export class ClusterDashboardComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() clusterData: any;
  serverUrls = {
    mon: '/main/cluster/system/server',
    server: '/main/cluster/system/server',
    pool: '/main/cluster/blockStorage/pool',
    disk: '/main/cluster/system/disk',
    iscsi: '/main/cluster/system/server',
    mds: '/main/cluster/fileStorage/mds',
    alarm: '/main/cluster/alarm/currentAlarm',
    performance: '/main/cluster/performance/clusterPerformance'
  };
  iopsChartOption = {
    title: {
      text: 'IOPS',
      left: 'center',
      top: '10px',
      textStyle: {
        fontSize: 18
      }
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '20',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data:[
        {name: this.translate.instant('dashboard.totalIops'),icon: 'circle'},
        {name: this.translate.instant('dashboard.readIops'),icon: 'circle'},
        {name: this.translate.instant('dashboard.writeIops'),icon: 'circle'}
      ],
      show: false
    },
    xAxis: {
      data: ['7:00', '7:30', '8:00', '8:30', '9:00'],
      type: 'category',
      boundaryGap: false
    },
    yAxis: {
      name: this.translate.instant('dashboard.unitIops'),
      nameLocation: 'center',
      nameGap: 24,
      nameTextStyle: {
        fontSize: 10
      },
      type: 'value'
    },
    series: [{
      type: 'line',
      symbol: 'circle',
      symbolSize: 1,
      name: this.translate.instant('dashboard.totalIops'),
      data: []
    },
      {
        type: 'line',
        symbol: 'circle',
        symbolSize: 1,
        name: this.translate.instant('dashboard.readIops'),
        data: []
      },
      {
        type: 'line',
        symbol: 'circle',
        symbolSize: 1,
        name: this.translate.instant('dashboard.writeIops'),
        data: []
      }]
  };
  byteChartOption = {
    title: {
      text: this.translate.instant('dashboard.wrSpeed'),
      left: 'center',
      top: '10px',
      textStyle: {
        fontSize: 18
      }
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '20',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data:[
        {name: this.translate.instant('dashboard.wrSpeed'),icon: 'circle'},
        {name: this.translate.instant('dashboard.readSpeed'),icon: 'circle'},
        {name: this.translate.instant('dashboard.writeSpeed'),icon: 'circle'}
      ],
      show: false
    },
    xAxis: {
      data: ['7:00', '7:30', '8:00', '8:30', '9:00'],
      type: 'category',
      boundaryGap: false
    },
    yAxis: {
      name: this.translate.instant('dashboard.uniterSpeed'),
      nameLocation: 'center',
      nameGap: 24,
      nameTextStyle: {
        fontSize: 10
      },
      type: 'value'
    },
    series: [{
      type: 'line',
      symbol: 'circle',
      symbolSize: 1,
      name: this.translate.instant('dashboard.wrSpeed'),
      data: []
    },
      {
        type: 'line',
        symbol: 'circle',
        symbolSize: 1,
        name: this.translate.instant('dashboard.readSpeed'),
        data: []
      },
      {
        type: 'line',
        symbol: 'circle',
        symbolSize: 1,
        name: this.translate.instant('dashboard.writeSpeed'),
        data: []
      }]
  };
  capacityChartOption = {
    color: ['#66cb98', '#fcca36'],
    title: {
      text: this.translate.instant('dashboard.clusterCapacity'),
      left: 'center',
      top: '10px',
      textStyle: {
        fontSize: 18
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: [this.translate.instant('dashboard.physicCapacity'),
        this.translate.instant('dashboard.availableCapacity')]
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      name: this.translate.instant('dashboard.free'),
      type: 'bar',
      barWidth: '30%',
      data: []
    },
      {
        name: this.translate.instant('dashboard.used'),
        type: 'bar',
        barWidth: '30%',
        data: []
      }]
  };
  public iopsChartInstance: any;
  pageResize: any;
  resizeTimer: any;

  constructor(private translate: TranslateService, private storageService: StorageService,
              private router: Router, private cdRef: ChangeDetectorRef, private zone: NgZone) { }

  ngOnInit() {
    this.initChartData();
    this.storageService.getSideBarShowSub().subscribe((res: any) => {
      this.resizeChart();
    });
    this.pageResize = fromEvent(window, 'resize').subscribe(() => {
      this.resizeChart();
    });
  }

  ngAfterViewInit() {
    this.resizeChart();
  }

  resizeChart() {
    if (this.resizeTimer) return;
    this.resizeTimer = setTimeout(() => {
      if (this.iopsChartInstance) {
        this.iopsChartInstance.resize();
      }
      this.resizeTimer = undefined;
    },100);
  }

  onIopsChartInit(instance: any) {
    this.iopsChartInstance = instance;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes['clusterData'].firstChange) {
      this.initChartData();
      this.iopsChartInstance.setOption(this.iopsChartOption);
    }
    //window.addEventListener('resize', this.resizeWindow);
  }

  alarmGradeClass() {
    return this.clusterData ? {
      'alarm-critical': this.clusterData.alarms[0].value,
      'alarm-serious': this.clusterData.alarms[1].value,
      'alarm-warn': this.clusterData.alarms[2].value,
      'alarm-prompt': this.clusterData.alarms[3].value
    } : {};
  }

  alarmIcon() {
    return (this.clusterData.alarms[0].value || this.clusterData.alarms[1].value) ? 'frown' :
        (this.clusterData.alarms[2].value || this.clusterData.alarms[3].value) ? 'meh' : 'smile';
  }

  initChartData() {
    this.setIopsChartOption();
    this.setBytesChartOption();
    this.setCapacityChartOption();
  }

  setIopsChartOption() {
    this.iopsChartOption.series[0].data = this.clusterData.iops.map(item => item.total);
    this.iopsChartOption.series[1].data = this.clusterData.iops.map(item => item.read);
    this.iopsChartOption.series[2].data = this.clusterData.iops.map(item => item.write);
  }

  setBytesChartOption() {
    this.byteChartOption.series[0].data = this.clusterData.bytePerSecond.map(item => +((item.read + item.write) / 1024).toFixed(2));
    this.byteChartOption.series[1].data = this.clusterData.bytePerSecond.map(item => +(item.read / 1024).toFixed(2));
    this.byteChartOption.series[2].data = this.clusterData.bytePerSecond.map(item => +(item.write / 1024).toFixed(2));
  }

  setCapacityChartOption() {
    this.capacityChartOption.series[0].data = [];
    this.capacityChartOption.series[0].data.push(this.clusterData.capaticy.physic.total);
    this.capacityChartOption.series[0].data.push(this.clusterData.capaticy.avail.total);
    this.capacityChartOption.series[1].data = [];
    this.capacityChartOption.series[1].data.push(this.clusterData.capaticy.physic.available);
    this.capacityChartOption.series[1].data.push(this.clusterData.capaticy.avail.available);
  }

  ngOnDestroy() {
    if (this.pageResize) {
      this.pageResize.unsubscribe();
    }
  }

}
