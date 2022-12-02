import { Component, Input } from '@angular/core';
import { TimeInterval } from '../models/timeInterval';

@Component({
  selector: 'app-time-intervals-grid',
  templateUrl: './time-intervals-grid.component.html',
  styleUrls: ['./time-intervals-grid.component.css']
})
export class TimeIntervalsGridComponent {
@Input() intervals : TimeInterval[] = [];
}
