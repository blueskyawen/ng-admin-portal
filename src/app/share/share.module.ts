import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PaletxUIModule } from 'paletxUI';
import { TranslateModule } from '@ngx-translate/core';
import { NgxEchartsModule } from "ngx-echarts";

import { PageNotFoundComponent } from '../share/page-not-found.component';

@NgModule({
  imports: [
    CommonModule, FormsModule, RouterModule, PaletxUIModule, TranslateModule,
    NgxEchartsModule
  ],
  declarations: [PageNotFoundComponent],
  exports: [ CommonModule, FormsModule, RouterModule, PaletxUIModule, TranslateModule, NgxEchartsModule,
    PageNotFoundComponent]
})
export class ShareModule { }

