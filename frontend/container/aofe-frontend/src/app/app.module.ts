import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginPageModule } from './pages/login.page/login.page.module';
import { RegisztPageModule } from './pages/regiszt.page/regiszt.page.module';
import { IndexPageModule } from './pages/index.page/index.page.module';
import { GuardInterceptor } from './interceptors/guard.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    LoginPageModule,
    RegisztPageModule,
    IndexPageModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: GuardInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
