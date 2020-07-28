import { Injectable } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHeaders, HttpHandler, HttpRequest,
  HttpResponse, HttpErrorResponse, HttpEventType} from '@angular/common/http';
import {Observable, throwError as observableThrowError, of} from 'rxjs';
import {catchError, finalize, tap} from 'rxjs/operators';
import { StorageService } from '../storage.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {
  constructor(public storageService: StorageService,
              public notification: NzNotificationService,
              private translate: TranslateService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let cloneReq = null;
    if (req.headers.keys().length === 0) {
      cloneReq = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept-Language': this.storageService.getAppLanguage() === 'en' ? 'en-US' : 'zh-CN'
        })
      });
    } else {
      cloneReq = req;
    }
    return next.handle(cloneReq).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            // console.log('HttpResponse:'+event.url);
          }
        },
        error => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 500) {
              this.notification.create('error', this.translate.instant('innerError'),'');
            } else {
              if (error.status >= 400) {
                this.notification.create('error', this.translate.instant('error'),
                    error.error ? error.error.error || error.error.message ||
                    (error.error.constructor === String ? error.error : JSON.stringify(error.error)) :
                    error.message || JSON.stringify(error) || this.translate.instant('errorMsg'));
              }
            }
            return observableThrowError(error);
          }
        }
      )
    );
  }
}
