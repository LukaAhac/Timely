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
    [{id: "testId", projectName : "testProject", timeStart : new Date(2018, 6, 28, 17, 23, 42), timeEnd : new Date(2018, 0O5, 0O5, 17, 23, 42), duration: new Date(2018, 0O5, 0O5, 17, 23, 42)},
    {id: "testId", projectName : "testProject", timeStart : new Date(2018, 9, 3, 17, 23, 42), timeEnd : new Date(2018, 0O5, 0O5, 17, 23, 42), duration: new Date(2018, 0O5, 0O5, 17, 23, 42)}];

  buttonClick() {
    if (this.buttonState === 'Start') {
      this.buttonState = 'Stop'
      this.timeIntervals.unshift({id: "testId", projectName : "testProject", timeStart : new Date(2018, 6, 28, 17, 23, 42), timeEnd : new Date(2018, 0O5, 0O5, 17, 23, 42), duration: new Date(2018, 0O5, 0O5, 17, 23, 42)});
    } else {
      this.buttonState = 'Start'
    }

  }
}
