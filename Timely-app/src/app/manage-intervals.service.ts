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
      id: this.newGuid(),
      projectName: ".....",
      timeStart: new Date(),
      timeEnd: null,
      duration: "....."
    };
    this.addTimeInterval(this.currentInterval);
  }

  stopInterval(projectName: string){
    this.currentInterval!.timeEnd = new Date();
    this.currentInterval!.duration = this.calculateDurationString(this.currentInterval!);
    this.currentInterval!.projectName = projectName;

    var timeZoneOffsetInMiliseconds = this.currentInterval!.timeStart.getTimezoneOffset() * 60000; 
    var timeStart_localISOTime = (new Date(this.currentInterval!.timeStart.valueOf() - timeZoneOffsetInMiliseconds)).toISOString();
    var timeEnd_localISOTime = (new Date(this.currentInterval!.timeEnd.valueOf() - timeZoneOffsetInMiliseconds)).toISOString();

    this.http.post(this.url + "/timeIntervals",{
      id: this.currentInterval!.id,
      projectName: this.currentInterval!.projectName,
      timeStart: timeStart_localISOTime,
      timeEnd: timeEnd_localISOTime
    }).subscribe();
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

  private newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
