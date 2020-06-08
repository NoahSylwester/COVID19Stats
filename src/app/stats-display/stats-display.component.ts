import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-stats-display',
  templateUrl: './stats-display.component.html',
  styleUrls: ['./stats-display.component.scss']
})
export class StatsDisplayComponent implements OnInit {

  constructor() { }

  @Input() queriedCountry: string;
  @Input() queriedDate: string;

  @Input() cases: [string, any][];
  @Input() deaths: [string, any][];
  @Input() tests: [string, any][];

  @Output() newYVariable = new EventEmitter();

  changeYVariable(values: string[]) {
    this.newYVariable.emit(values)
  }

  ngOnInit(): void {
  }

}
