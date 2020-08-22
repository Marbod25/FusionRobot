import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SheetComponent } from './sheet/sheet.component';
import { AppRoutingModule } from './app-routing.module';
import { ViewComponent } from './view/view.component';
import { SelectorComponent } from './selector/selector.component';
import { httpInterceptorProviders } from './interceptors';
import { HttpClient, HttpHandler, HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './product/product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './card/card.component';
import { ProductcardComponent } from './productcard/productcard.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SheetComponent,
    ViewComponent,
    SelectorComponent,
    ProductComponent,
    CardComponent,
    ProductcardComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
