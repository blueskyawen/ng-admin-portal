import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {StorageService} from '../../../core';

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
  constructor(private translate: TranslateService, public storageService: StorageService) {
    this.links[0].label = `${this.links[0].label}: ${this.storageService.getLocalStorage('clusterName')}`;
  }

  ngOnInit() {
  }

}
