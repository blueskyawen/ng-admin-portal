import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    <div class="not-found-page">
      <div class="not-found">
        <div class="image-bg"></div>
        <button pxButton type="button" class="ui-button-info" label="{{'back' | translate}}" (click)="goBack()"></button>
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
