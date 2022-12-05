import { Component } from '@angular/core';
import { ManageIntervalsService } from '../manage-intervals.service';
import { TimeInterval } from '../models/timeInterval';

@Component({
  selector: 'app-time-intervals-grid',
  templateUrl: './time-intervals-grid.component.html',
  styleUrls: ['./time-intervals-grid.component.css']
})

export class TimeIntervalsGridComponent {
  intervals: TimeInterval[] = [];
  pageNumber: number = 1;
  currentInterval: TimeInterval | null = null;

  constructor(private manageIntervalsService: ManageIntervalsService) {
    this.manageIntervalsService.intervalsChange.subscribe((value) => {
      this.intervals = value
    });
    this.manageIntervalsService.pageNumberChange.subscribe((value) => {
      this.pageNumber = value
    });
    this.manageIntervalsService.currentIntervalChange.subscribe((value) => {
      this.currentInterval = value
    });
    this.manageIntervalsService.loadIntervals();
  }

  previousButtonClicked() {
    this.manageIntervalsService.pageDown();
  }

  nextButtonClicked() {
    this.manageIntervalsService.pageUp();
  }
}
