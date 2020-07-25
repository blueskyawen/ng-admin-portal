import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'storage-pool',
  templateUrl: './storage-pool.component.html',
  styleUrls: ['./storage-pool.component.less']
})
export class StoragePoolComponent implements OnInit {
  links : any[] = [
    {
      label: this.translate.instant('cluster'),
      routerLink: ['/main/cluster/overview']
    }
  ];
  constructor(private translate: TranslateService) {
    this.links[0].label = `${this.links[0].label}: ${window.localStorage['clusterName']}`;
  }

  ngOnInit() {
  }

}
