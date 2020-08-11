import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SheetComponent } from './sheet/sheet.component';


const appRoutes: Routes =
[
  { path: '', component : HomeComponent },
  { path: 'Sheet', component : SheetComponent },
];

@NgModule({
  declarations: [],
  imports: [
      RouterModule.forRoot(
        appRoutes,
        { preloadingStrategy: PreloadAllModules },
      ),
    BrowserModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
