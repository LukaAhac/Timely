import { Component } from '@angular/core';
import { ManageIntervalsService } from '../manage-intervals.service';
import { TimeInterval } from '../models/timeInterval';

@Component({
  selector: 'app-time-intervals-grid',
  templateUrl: './time-intervals-grid.component.html',
  styleUrls: ['./time-intervals-grid.component.css']
})

export class TimeIntervalsGridComponent {
intervals : TimeInterval[] = [];

  constructor(private manageIntervalsService: ManageIntervalsService) {}

  ngOnInit() : void {
    this.intervals = this.manageIntervalsService.getIntervals();
  }
}
