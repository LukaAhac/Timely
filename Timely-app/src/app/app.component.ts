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
  timeIntervals: TimeInterval[] = 
    [{id: "testId", projectName : "testProject", timeStart : new Date(), timeEnd : new Date(), duration: new Date()},
    {id: "testId", projectName : "testProject", timeStart : new Date(), timeEnd : new Date(), duration: new Date()}];

  buttonClick() {
    if (this.buttonState === 'Start') {
      this.buttonState = 'Stop'
    } else {
      this.buttonState = 'Start'
    }

  }
}
