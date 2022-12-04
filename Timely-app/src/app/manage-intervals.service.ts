import { Injectable } from '@angular/core';
import { TimeInterval } from './models/timeInterval';

@Injectable({
  providedIn: 'root'
})
export class ManageIntervalsService {
  intervals: TimeInterval[] = [];


  constructor() { }

  getIntervals() : TimeInterval[] {
    return this.intervals;
  }

  addTimeInterval(interval: TimeInterval) : void {
    this.intervals.unshift(interval);
    if(this.intervals.length > 5){
      this.intervals.pop();
    }
  }
}
