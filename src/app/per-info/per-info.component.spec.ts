import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerInfoComponent } from './per-info.component';

describe('PerInfoComponent', () => {
  let component: PerInfoComponent;
  let fixture: ComponentFixture<PerInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
