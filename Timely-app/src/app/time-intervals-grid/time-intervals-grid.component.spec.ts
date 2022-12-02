import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeIntervalsGridComponent } from './time-intervals-grid.component';

describe('TimeIntervalsGridComponent', () => {
  let component: TimeIntervalsGridComponent;
  let fixture: ComponentFixture<TimeIntervalsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeIntervalsGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeIntervalsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
