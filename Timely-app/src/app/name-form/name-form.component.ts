import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-name-form',
  templateUrl: './name-form.component.html',
  styleUrls: ['./name-form.component.css']
})

export class NameFormComponent {
  projectNameControl = new FormControl('');
  @Output() projectNameEvent =  new EventEmitter<string>();
  @Output() exitButtonEvent =  new EventEmitter<void>();

  displayWarning: boolean = false;

    submitForm(){
      var projectName = this.projectNameControl.getRawValue();

      if(projectName!.length === 0){
        this.displayWarning = true;
      } else {
        this.projectNameEvent.emit(this.projectNameControl.getRawValue()!);
      }
    }

    exitButtonClicked(){
      this.exitButtonEvent.emit();
    }
}
