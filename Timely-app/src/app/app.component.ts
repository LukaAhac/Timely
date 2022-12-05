import { Component } from '@angular/core';
import { ManageIntervalsService } from './manage-intervals.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  buttonState = 'Start'
  buttonDisabled = false;
  displayForm: boolean = false;

  constructor(private manageIntervalsService: ManageIntervalsService) {}

  buttonClick() {
    if (this.buttonState === 'Start') {
      this.buttonState = 'Stop'
      this.manageIntervalsService.startNewInterval();
    } else {
      this.buttonDisabled = true;
      this.displayForm=true;
    }
  }

  formSubmited(projectName : string){
    this.buttonState = 'Start'
    this.manageIntervalsService.stopInterval(projectName);
    this.formClosed();
  }

  formClosed(){
    this.displayForm=false;
    this.buttonDisabled = false;
  }
}
