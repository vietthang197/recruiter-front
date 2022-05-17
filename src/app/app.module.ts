import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {IconsProviderModule} from './icons-provider.module';
import {LoginComponent} from './pages/auth/login/login.component';
import {DemoNgZorroAntdModule} from "./ng-zorro-antd.module";
import {en_US, NZ_I18N} from "ng-zorro-antd/i18n";

const customLanguagePack = {
  en_US,
}

customLanguagePack.en_US.Pagination.items_per_page = "bản ghi";

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    IconsProviderModule,
    DemoNgZorroAntdModule
  ],
  bootstrap: [AppComponent],
  providers: [{ provide: NZ_I18N, useValue: customLanguagePack }]
})
export class AppModule { }
