import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    <div class="not-found-page">
      <div class="not-found">
        <div class="image-bg"></div>
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
