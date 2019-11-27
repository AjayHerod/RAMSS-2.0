import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from '../app.component';
import { ScheduleModule, RecurrenceEditorModule, DayService, WeekService, WorkWeekService, MonthService, MonthAgendaService } from '@syncfusion/ej2-angular-schedule';

@NgModule({
    declarations: [
      AppComponent
],
imports: [
    BrowserModule,
	ScheduleModule, RecurrenceEditorModule  
  ],
  providers: [DayService, WeekService, WorkWeekService, MonthService, MonthAgendaService],
  bootstrap: [AppComponent]
})

export class AppModule {}
