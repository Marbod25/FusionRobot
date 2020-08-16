import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SheetComponent } from './sheet/sheet.component';
import { AppRoutingModule } from './app-routing.module';
import { ViewComponent } from './view/view.component';
import { SelectorComponent } from './selector/selector.component';
import { httpInterceptorProviders } from './interceptors';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './product/product.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SheetComponent,
    ViewComponent,
    SelectorComponent,
    ProductComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
