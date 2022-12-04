import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TimeInterval } from './models/timeInterval';

@Injectable({
  providedIn: 'root'
})
export class ManageIntervalsService {
  url: string = "http://localhost:5000/api";

  intervals: TimeInterval[] = [];
  currentInterval: TimeInterval | null = null;

  
  constructor(private http: HttpClient) {}

  getIntervals() : TimeInterval[] {
    this.http.get(this.url + "/timeIntervals").subscribe((data : any) => {
      data.forEach((element: any) => {
        this.intervals.unshift({
          id: element.id,
          projectName: element.projectName,
          timeStart: new Date(element.timeStart),
          timeEnd: new Date(element.timeEnd),
          duration: ""
        });
        this.intervals[0].duration = this.calculateDurationString(this.intervals[0])
      });
    });
    return this.intervals;
  }

  startNewInterval() {
    this.currentInterval = {
      id: "testId",
      projectName: ".....",
      timeStart: new Date(),
      timeEnd: null,
      duration: "....."
    };
    this.addTimeInterval(this.currentInterval);
  }

  stopInterval(){
    this.currentInterval!.timeEnd = new Date();
    this.currentInterval!.duration = this.calculateDurationString(this.currentInterval!);
  }

  updateIntervalProjectName(projectName: string){
    this.currentInterval!.projectName = projectName;
  }

  private addTimeInterval(interval: TimeInterval) : void {
    this.intervals.unshift(interval);
    if(this.intervals.length > 5){
      this.intervals.pop();
    }
  }

  private calculateDurationString(interval: TimeInterval) {
    var duration = +(interval.timeEnd!) - +(interval.timeStart);
    var seconds = Math.floor((duration / 1000) % 60);
    var minutes = Math.floor((duration / (1000 * 60)) % 60);
    var hours = Math.floor((duration / (1000 * 60 * 60)));

    return (hours < 10 ? "0" + hours : hours) + ":" 
          + (minutes < 10 ? "0" + minutes : minutes) + ":"
          + (seconds < 10 ? "0" + seconds : seconds);
  }
}
