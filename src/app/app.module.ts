import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, APP_INITIALIZER } from '@angular/core';
import { LOCATION_INITIALIZED } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CoreModule } from './core/core.module';
import { ShareModule } from './share/share.module';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './login/login.module';
import { DashboardModule } from './dashboard/dashboard.module';

import { AppComponent } from './app.component';

import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
/** 配置 angular i18n **/
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);

export function HttpLoaderFactory(http: HttpClient): any {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function appInitializerFactory(translate: TranslateService, injector: Injector) {
  return () => new Promise<any>((resolve: any) => {
    const locationInitialized = injector.get(LOCATION_INITIALIZED, Promise.resolve(null));
    locationInitialized.then(() => {
      const lang = window.localStorage['cephLang'] ? window.localStorage['cephLang'] :
        (translate.getBrowserLang() === 'zh' ? 'zh' : 'en');
      translate.setDefaultLang(lang);
      translate.use(lang).subscribe(() => {
        // console.info(`Successfully initialized '${lang}' language.'`);
      }, err => {
        // console.error(`Problem with '${lang}' language initialization.'`);
      }, () => {
        resolve(null);
      });
    });
  });
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule, CoreModule, ShareModule, AppRoutingModule, LoginModule, DashboardModule,
    BrowserAnimationsModule, NgZorroAntdModule,
    TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      }
    )
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [TranslateService, Injector],
      multi: true
    },
    [ { provide: NZ_I18N, useValue: zh_CN } ]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
