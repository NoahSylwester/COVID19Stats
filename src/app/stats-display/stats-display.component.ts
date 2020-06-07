import { Component, OnInit, Input } from '@angular/core';

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

  ngOnInit(): void {
  }

}
