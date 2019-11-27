import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from '../app.component';
import { ScheduleModule, DayService, WeekService, MonthService } from '@syncfusion/ej2-angular-schedule';

@NgModule({
    declarations: [
      AppComponent
],
imports: [
    BrowserModule,
	ScheduleModule  
  ],
  providers: [DayService, WeekService, MonthService],
  bootstrap: [AppComponent]
})

export class AppModule {}
