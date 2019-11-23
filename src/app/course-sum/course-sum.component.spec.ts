import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseSumComponent } from './course-sum.component';

describe('CourseSumComponent', () => {
  let component: CourseSumComponent;
  let fixture: ComponentFixture<CourseSumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseSumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseSumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
