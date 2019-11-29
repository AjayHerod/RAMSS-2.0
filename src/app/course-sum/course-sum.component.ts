import { Component, OnInit, } from '@angular/core';
import { EventSettingsModel, DayService, WeekService, WorkWeekService, MonthService, View, EventRenderedArgs} from '@syncfusion/ej2-angular-schedule';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import {course} from './course';
import {lecture} from './lecture';
import {examC} from './exam';
import { EventSettings } from '@syncfusion/ej2-schedule/src/schedule/models/event-settings';

@Component({
	selector: 'app-course-sum',
	providers: [DayService, WeekService, WorkWeekService, MonthService],
	templateUrl: './course-sum.component.html',
  styleUrls: ['./course-sum.component.css']
})
export class CourseSumComponent implements OnInit {

  constructor() { 
		this.loadCourses();
		
	}

	public scheduleViews: View[] = ['Day','Week', 'WorkWeek', 'Month'];
	public workWeekDays: number[]= [1, 2, 3, 4, 5];

  public currentYear:string = "2019"; //default
	public currentSemester:string = "Fall";//default
	public lectureStartDate:number = 3;//default for Fall
	public lectureStartMonth:number = 8;//default for Fall

	public courseObjects = [];
	public courseObjectsCount = 0;
	public courseExamObjects = [];

	public lectureObjects: Object[];
	public eventScheduler: EventSettingsModel;

	public lectureWeek = [];
	
  ngOnInit() {
		
  }

  applyCategoryColor(args: EventRenderedArgs): void {
	let categoryColor: string = args.data.CategoryColor as string;
	if (!args.element || !categoryColor) {
		return;
	}
	args.element.style.backgroundColor = categoryColor;
	}

  //dropCourse() {
    //drop course code
	//}
	
	returnRecurrenceDay(day){
		if(day == "Monday")
		{
			return 'MO';
		}
		else if(day == "Tuesday")
		{
			return 'TU';
		}
		else if(day == "Wednesday")
		{
			return 'WE';
		}
		else if(day == "Thursday")
		{
			return 'TH';
		}
		else if(day == "Friday")
		{
			return 'FR';
		}
		else 
		{
			return 'ER';
		}
	}

	displayLecturesLabs()
	{
		var c = [];
		var timeModStart=0, timeModEnd=0;
		var recurrenceString = 'FREQ=WEEKLY;INTERVAL=1;UNTIL=20191203T041343Z;BYDAY=';
		var rec = '';
		for(var i in this.lectureWeek)
		{
			//first Lecture
			timeModStart = this.lectureWeek[i].lecture1StartTime, timeModEnd=this.lectureWeek[i].lecture1EndTime;
			
			if(this.lectureWeek[i].lecture1StartAcr == "PM")
			{
				timeModStart = this.lectureWeek[i].lecture1StartTime + 12;
			}
			if(this.lectureWeek[i].lecture1EndAcr == "PM")
			{
				timeModEnd = this.lectureWeek[i].lecture1EndTime + 12;
			}
			rec = this.returnRecurrenceDay(this.lectureWeek[i].lecture1Day);
			c.push({
				Subject: this.lectureWeek[i].coursecode + " - Lecture \n" + this.lectureWeek[i].lecture1Location,
				StartTime: new Date(+this.currentYear, this.lectureStartMonth, this.lectureStartDate, timeModStart, 0),
				EndTime: new Date(+this.currentYear, this.lectureStartMonth, this.lectureStartDate, timeModEnd, 0),
				RecurrenceRule: recurrenceString + rec,  });

				console.log(recurrenceString + rec);
			//Second Lecture
			timeModStart = this.lectureWeek[i].lecture2StartTime, timeModEnd=this.lectureWeek[i].lecture2EndTime;
			
			if(this.lectureWeek[i].lecture2StartAcr == "PM")
			{
				timeModStart = this.lectureWeek[i].lecture2StartTime + 12;
			}
			if(this.lectureWeek[i].lecture2EndAcr == "PM")
			{
				timeModEnd = this.lectureWeek[i].lecture2EndTime + 12;
			}
			rec = this.returnRecurrenceDay(this.lectureWeek[i].lecture2Day);
			c.push({
				Subject: this.lectureWeek[i].coursecode + " - Lecture \n" + this.lectureWeek[i].lecture2Location,
				StartTime: new Date(+this.currentYear, this.lectureStartMonth, this.lectureStartDate, timeModStart, 0),
				EndTime: new Date(+this.currentYear, this.lectureStartMonth, this.lectureStartDate, timeModEnd, 0),
				RecurrenceRule: recurrenceString + rec})

				console.log(recurrenceString + rec);
			//Lab if Exists
			if(this.lectureWeek[i].labStartTime != 0)
			{
				timeModStart = this.lectureWeek[i].labStartTime, timeModEnd=this.lectureWeek[i].labEndTime;
			
				if(this.lectureWeek[i].labStartAcr == "PM")
				{
					timeModStart = this.lectureWeek[i].labStartTime + 12;
				}
				if(this.lectureWeek[i].labEndAcr == "PM")
				{
					timeModEnd = this.lectureWeek[i].labEndTime + 12;
				}
				rec = this.returnRecurrenceDay(this.lectureWeek[i].labDay);
				c.push({
					Subject: this.lectureWeek[i].coursecode + " - Lab \n" + this.lectureWeek[i].labLocation,
					StartTime: new Date(+this.currentYear, this.lectureStartMonth, this.lectureStartDate, timeModStart, 0),
					EndTime: new Date(+this.currentYear, this.lectureStartMonth, this.lectureStartDate, timeModEnd, 0),
					RecurrenceRule: recurrenceString + rec })
			}
			console.log(recurrenceString + rec);
		}
		for(var i in this.courseExamObjects)
		{
			timeModStart = this.courseExamObjects[i].examStartTime, timeModEnd=this.courseExamObjects[i].examEndTime;
				if(this.courseExamObjects[i].examStartAcr == "PM")
				{
					timeModStart = this.courseExamObjects[i].examStartTime + 12;
				}
				if(this.courseExamObjects[i].examEndAcr == "PM")
				{
					timeModEnd = this.courseExamObjects[i].examEndTime + 12;
				}
				c.push({
					Subject: this.courseExamObjects[i].coursecode + " - EXAM! <br>" + this.courseExamObjects[i].examLocation,
					StartTime: new Date(+this.currentYear, 11, this.courseExamObjects[i].examDate, timeModStart, 0),
					EndTime: new Date(+this.currentYear, 11, this.courseExamObjects[i].examDate, timeModEnd, 0),
					CategoryColor: '#FF0000' })
		}
		this.lectureObjects = c;
		this.eventScheduler = {dataSource: this.lectureObjects};
	}
  
	loadCourses(){
      $.ajax({
			method: 'post',
			url: '/loadCourses',
			contentType: 'application/json',
			success: (data) => {
				console.log(data);
				for (var i in data){
					if(data[i].Term == "F19")
					{
					var c = new course(data[i].CourseCode, data[i].Faculty, data[i].Cost, 
					data[i].Credit, data[i].Professor, data[i].LectureDates, data[i].LabDates, 
					data[i].ExamDates, data[i].Term, data[i].EnrollID, data[i].StudentNo);
					this.courseObjects.push(c);
					console.log(c);
					this.courseObjectsCount++;
					this.pushLectureObjects(data[i].LectureDates, data[i].LabDates, data[i].CourseCode, data[i].Faculty, data[i].Professor);
					this.pushExamObjects(data[i].CourseCode, data[i].ExamDates);
					}
				}
				this.displayLecturesLabs();
			},
			error: function() {
				console.log("Failed to Retrieve data");
			}
		})
	}

	pushExamObjects(code, examDate)
	{
		var split = examDate.split(",")
		var date = split[0];
		var dateSplit = date.split(" ");
		var loc = split[1];
		var time = split[2];
		var splitTime = this.splitTimes(time);
		var c = new examC(code, +dateSplit[1], dateSplit[0], +splitTime[0], splitTime[1], +splitTime[2],splitTime[3], loc);
		this.courseExamObjects.push(c);
	}	

	pushLectureObjects(lec, lab, code, faculty, prof)
	{
		
		var splitLec = lec.split(" ");
		var d1 = splitLec[0];
		var time1 = this.splitTimes(splitLec[1]);
		var loc1 = splitLec[2];
		var d2 = splitLec[3];
		var time2 = this.splitTimes(splitLec[4]);
		var loc2 = splitLec[5];

		if(loc1.substring(loc1.length-1,loc1.length) == ",")
		{
			loc1 = loc1.substring(0,loc1.length-1);
		}

		var splitLab = lab.split(" ");
		if(splitLab[0].length > 2)
		{
		var labDay = splitLab[0];
		var labTime = this.splitTimes(splitLab[1]);
		var labLoc = splitLab[2];
		}
		else
		{
			labDay = "NoLab";
			labTime = ["0","No","0","Lab"];
			labLoc="NoLab";
		}

		console.log(code, faculty, prof, d1, +time1[0], time1[1], +time1[2], time1[3], loc1,
			d2, +time2[0], time2[1], +time2[2], time2[3], loc2, 
			labDay, +labTime[0], labTime[1], +labTime[2], labTime[3], labLoc);

		var c = new lecture(code, faculty, prof, d1, +time1[0], time1[1], +time1[2], time1[3], loc1,
										d2, +time2[0], time2[1], +time2[2], time2[3], loc2, 
										labDay, +labTime[0], labTime[1], +labTime[2], labTime[3], labLoc);
		this.lectureWeek.push(c);	

	}

	splitTimes(time){
		var length = time.length;
		var endAcronym = "AP";
		var endTime = "0";
		var startAcronym = "AP";
		var startTime = "0";
		var startEndTimeSplit = time.split("-");
		endAcronym = time.substring(length-2,length);
		endTime = startEndTimeSplit[1].substring(0,startEndTimeSplit[1].length-2);
		startAcronym = startEndTimeSplit[0].substring(startEndTimeSplit[0].length-2,startEndTimeSplit[0].length);
		startTime = startEndTimeSplit[0].substring(0,startEndTimeSplit[0].length-2);
		return [startTime, startAcronym, endTime, endAcronym];
	}
	
	loadGrades(){
		$.ajax({
			method: 'post',
			url: '/loadGrades',
			contentType: 'application/json',
			success: (data) => {
				console.log(data);
			},
			error: function() {
				console.log("Failed to Retrieve data");
			}
		})
    }
}
