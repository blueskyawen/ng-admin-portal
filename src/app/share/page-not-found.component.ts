import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    <div class="not-found-page">
      <div class="not-found">
        <div class="image-bg"></div>
        <button nz-button nzType="dashed" (click)="goBack()">{{'back' | translate}}</button>
      </div>
    </div>
  `,
  styleUrls: ['page-not-found.component.less']
})
export class PageNotFoundComponent {

  constructor() { }

  goBack() {
    history.back();
  }

}
