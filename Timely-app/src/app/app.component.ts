import { Component } from '@angular/core';
import { ManageIntervalsService } from './manage-intervals.service';
import { TimeInterval } from './models/timeInterval';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  buttonState = 'Start'
  buttonDisabled = false;
  current: TimeInterval | null = null;
  displayForm: boolean = false;

  constructor(private manageIntervalsService: ManageIntervalsService) {}

  buttonClick() {
    if (this.buttonState === 'Start') {
      this.buttonState = 'Stop'
      this.current = { id: "testId", projectName: ".....", timeStart: new Date(), timeEnd: null, duration: "....." };
      this.manageIntervalsService.addTimeInterval(this.current);
    } else {
      this.buttonState = 'Start'
      this.current!.timeEnd = new Date();
      this.current!.duration = this.msToTime(+(this.current!.timeEnd) - +(this.current!.timeStart));
      this.buttonDisabled = true;
      this.displayForm=true;
    }
  }

  updateProjectName(projectName : string){
    this.current!.projectName = projectName;
    this.displayForm=false;
    this.buttonDisabled = false;
  }

  msToTime(duration: number) {
    var seconds = Math.floor((duration / 1000) % 60);
    var minutes = Math.floor((duration / (1000 * 60)) % 60);
    var hours = Math.floor((duration / (1000 * 60 * 60)));

    return (hours < 10 ? "0" + hours : hours) + ":" 
          + (minutes < 10 ? "0" + minutes : minutes) + ":"
          + (seconds < 10 ? "0" + seconds : seconds);
  }
}
