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

    submitForm(){
      this.projectNameControl.getRawValue();
      console.log("Form subbmited!", this.projectNameControl.getRawValue());
      this.projectNameEvent.emit(this.projectNameControl.getRawValue()!);
    }
}
