import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccInfoComponent } from './acc-info/acc-info.component';
import { PerInfoComponent } from './per-info/per-info.component';

@NgModule({
  declarations: [
    AppComponent,
    AccInfoComponent,
    PerInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
