import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { LoginPageModule } from './pages/login.page/login.page.module';
import { RegisztPageModule } from './pages/regiszt.page/regiszt.page.module';
import { IndexPageModule } from './pages/index.page/index.page.module';

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
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
