import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SheetComponent } from './sheet/sheet.component';
import { AppRoutingModule } from './app-routing.module';
import { ViewComponent } from './view/view.component';
import { SelectorComponent } from './selector/selector.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SheetComponent,
    ViewComponent,
    SelectorComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
