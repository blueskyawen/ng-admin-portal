import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { TranslateModule } from '@ngx-translate/core';
import { NgxEchartsModule } from "ngx-echarts";

import { PageNotFoundComponent } from '../share/page-not-found.component';

@NgModule({
  imports: [
    CommonModule, FormsModule, RouterModule, NgZorroAntdModule, TranslateModule,
    NgxEchartsModule, ReactiveFormsModule
  ],
  declarations: [PageNotFoundComponent],
  exports: [ CommonModule, FormsModule, RouterModule, NgZorroAntdModule, TranslateModule, NgxEchartsModule,
    ReactiveFormsModule, PageNotFoundComponent]
})
export class ShareModule { }

