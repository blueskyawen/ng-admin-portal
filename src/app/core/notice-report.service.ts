import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';

export class NoticeReport {
  type: string;
  title: string;
  msg: string;
  constructor(type: string, title: string, msg: string) {
    this.type = type;
    this.title = title;
    this.msg = msg;
  }
}

@Injectable({
  providedIn: 'root'
})
export class NoticeReportService {
  public noticeReport$ = new Subject<NoticeReport>();

  constructor(private translate: TranslateService) {
  }

  getNoticeReport(): any {
    return this.noticeReport$;
  }

  reportSucess(msgObj: any) {
    this.noticeReport$.next(new NoticeReport('success', msgObj.title, msgObj.message));
  }

  reportWarn(msgObj: any) {
    this.noticeReport$.next(new NoticeReport('warn', msgObj.title, msgObj.message));
  }

  reportError(msgObj: any) {
    this.noticeReport$.next(new NoticeReport('error', msgObj.title, msgObj.message));
  }
}

