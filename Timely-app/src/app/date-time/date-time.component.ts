import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.component.html',
  styleUrls: ['./date-time.component.css']
})

export class DateTimeComponent {
  @Input() date: Date | null = null;
}
