import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import { ToastrModule } from 'ngx-toastr';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from "@shared/shared.module";
import {environment} from "@env";

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    ToastrModule.forRoot({
      countDuplicates: true,
      maxOpened: 3,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      timeOut: 10000,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
