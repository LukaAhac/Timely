import { Component } from '@angular/core';
import { TimeInterval } from './models/timeInterval';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Timely';
  buttonState = 'Start'
  current: TimeInterval | null = null;
  timeIntervals: TimeInterval[] = 
    [{id: "testId", projectName : "testProject", timeStart : new Date(2018, 6, 28, 17, 23, 42), timeEnd : new Date(2018, 0O5, 0O5, 17, 23, 42),duration: "smgh"},
    {id: "testId", projectName : "testProject", timeStart : new Date(2018, 9, 3, 17, 23, 42), timeEnd : new Date(2018, 0O5, 0O5, 17, 23, 42), duration: "test"}];

  buttonClick() {
    if (this.buttonState === 'Start') {
      this.buttonState = 'Stop'
      this.current = {id: "testId", projectName : ".....", timeStart : new Date(), timeEnd : null, duration: "....."};
      this.timeIntervals.unshift(this.current);
    } else {
      this.buttonState = 'Start'
      this.current!.timeEnd = new Date();
      this.current!.duration = this.msToTime(+(this.current!.timeEnd) - +(this.current!.timeStart));
    }
  }

  msToTime(duration: number){
    var seconds = Math.floor((duration / 1000) % 60);
    var minutes = Math.floor((duration / (1000 * 60)) % 60);
    var hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  return (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
  }
}
