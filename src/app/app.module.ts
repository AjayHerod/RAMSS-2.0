import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccInfoComponent } from './acc-info/acc-info.component';
import { PerInfoComponent } from './per-info/per-info.component';
import { CourseSumComponent } from './course-sum/course-sum.component';
import { ManageCoursesComponent } from './manage-courses/manage-courses.component';
import { GradesComponent } from './grades/grades.component';
import { AcademicComponent } from './academic/academic.component';
import { RequestsComponent } from './requests/requests.component';
import * as $ from 'jquery';
import * as bootstrap from 'bootstrap';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { ScheduleModule, RecurrenceEditorModule } from '@syncfusion/ej2-angular-schedule';

@NgModule({
  declarations: [
    AppComponent,
    AccInfoComponent,
    PerInfoComponent,
    CourseSumComponent,
    ManageCoursesComponent,
    GradesComponent,
    AcademicComponent,
    RequestsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
	HttpClientModule,
    AppRoutingModule,
	FormsModule,
	ScheduleModule, RecurrenceEditorModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
