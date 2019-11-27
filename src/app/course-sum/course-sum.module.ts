import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from '../app.component';
import { EventSettingsModel, ScheduleModule, DayService, WeekService, WorkWeekService, MonthService} from '@syncfusion/ej2-angular-schedule';

@NgModule({
    declarations: [
      AppComponent
],
imports: [
    BrowserModule,
	ScheduleModule  
  ],
  providers: [DayService, WeekService, WorkWeekService, MonthService ],
  bootstrap: [AppComponent]
})

export class AppModule {}
