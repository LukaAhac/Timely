import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Pagination } from './models/pagination';
import { TimeInterval } from './models/timeInterval';

@Injectable({
  providedIn: 'root'
})
export class ManageIntervalsService {
  url: string = "http://localhost:5000/api";

  intervals: TimeInterval[] = [];
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 5,
    totalItems: null,
    totalPages: null
  };
  currentInterval: TimeInterval | null = null;

  intervalsChange: Subject<TimeInterval[]> = new Subject<TimeInterval[]>();
  pageNumberChange: Subject<number> = new Subject<number>;
  currentIntervalChange: Subject<TimeInterval | null> = new Subject<TimeInterval | null>();


  constructor(private http: HttpClient) { }

  loadIntervals() {
    this.intervals = [];
    
    this.http.get(this.url + "/timeIntervals", {
      observe: 'response', params: {
        pageNumber: this.pagination.currentPage, 
        pageSize: this.pagination.itemsPerPage
      }
    }).subscribe((response: any) => {
      var data = response.body;
      data.forEach((element: any) => {
        this.intervals.push({
          id: element.id,
          projectName: element.projectName,
          timeStart: new Date(element.timeStart),
          timeEnd: new Date(element.timeEnd),
          duration: ""
        });
        this.intervals.at(-1)!.duration = this.calculateDurationString(this.intervals.at(-1)!)
      });

      var paginationHeaderElements : string[] = [];
      var paginationHeader: string = response.headers.get("Pagination");
      paginationHeader.split(",").forEach(x => {
        paginationHeaderElements.push(x.split(":")[1]);
      }) 

      paginationHeaderElements[paginationHeaderElements.length-1] =  paginationHeaderElements.at(-1)!.slice(0, paginationHeaderElements.at(-1)!.length-1)
      this.pagination.currentPage = Number(paginationHeaderElements[0]);
      this.pagination.itemsPerPage = Number(paginationHeaderElements[1]);
      this.pagination.totalItems = Number(paginationHeaderElements[2]);
      this.pagination.totalPages = Number(paginationHeaderElements[3]);
    });

    this.alertIntervalPageChange();
  }

  startNewInterval() {
    this.currentInterval = {
      id: this.newGuid(),
      projectName: ".....",
      timeStart: new Date(),
      timeEnd: null,
      duration: "....."
    };

    this.alertCurrentIntervalChange();
  }

  async stopInterval(projectName: string) {
    this.currentInterval!.timeEnd = new Date();
    this.currentInterval!.duration = this.calculateDurationString(this.currentInterval!);
    this.currentInterval!.projectName = projectName;

    var timeZoneOffsetInMiliseconds = this.currentInterval!.timeStart.getTimezoneOffset() * 60000;
    var timeStart_localISOTime = (new Date(this.currentInterval!.timeStart.valueOf() - timeZoneOffsetInMiliseconds)).toISOString();
    var timeEnd_localISOTime = (new Date(this.currentInterval!.timeEnd.valueOf() - timeZoneOffsetInMiliseconds)).toISOString();

    this.http.post(this.url + "/timeIntervals", {
      id: this.currentInterval!.id,
      projectName: this.currentInterval!.projectName,
      timeStart: timeStart_localISOTime,
      timeEnd: timeEnd_localISOTime
    }).subscribe(data => {
      this.currentInterval = null;
      this.pagination.currentPage = 1;
      this.loadIntervals()
  
      this.alertCurrentIntervalChange();
      this.alertIntervalPageChange();
    });
  }

  pageDown() {
    if (this.pagination.currentPage > 1) {
      this.pagination.currentPage--;
      this.loadIntervals();
    }
  }
  pageUp() {
    if(this.pagination.currentPage < this.pagination.totalPages!){
      this.pagination.currentPage++;
      this.loadIntervals();
    }
  }

  private alertIntervalPageChange() {
    this.intervalsChange.next(this.intervals);
    this.pageNumberChange.next(this.pagination.currentPage);
  }

  private alertCurrentIntervalChange() {
    this.currentIntervalChange.next(this.currentInterval);
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
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
