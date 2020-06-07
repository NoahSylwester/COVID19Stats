import { Component, OnInit, HostBinding } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes
} from '@angular/animations';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.scss'],
  animations: [
    trigger('loading', [
      state('start', style({
        cy: "80%",
        fill: "rgba(256,256,256,0.5)"
      })),
      state('end', style({
        cy: "30%",
        fill: "rgba(256,256,256,0.5)"
      })),
      transition('start => end', [
        animate('0.6s ease-in-out', keyframes([
          style({
            fill: "rgba(192,29,29,0.5)",
            cy: "80%",
            r: 30
          }),
          style({
            fill: "rgba(192,29,29,0.3)",
            cy: "55%",
            r: 25
          }),
          style({
            fill: "rgba(192,29,29,0.5)",
            cy: "30%",
            r: 30
          })
        ]))
      ]),
      transition('end => start', [
        animate('0.6s ease-in-out', keyframes([
          style({
            fill: "rgba(192,29,29,0.5)",
            cy: "30%",
            r: 30
          }),
          style({
            fill: "rgba(192,29,29,1)",
            cy: "55%",
            r: 35
          }),
          style({
            fill: "rgba(192,29,29,0.5)",
            cy: "80%",
            r: 30
          })
        ]))
      ]),
    ]),
  ],
})
export class LoadingIndicatorComponent implements OnInit {

  constructor() { }

  animationFlag: boolean = true;

  toggle() {
    this.animationFlag = !this.animationFlag;
  }

  ngOnInit(): void {
  }

}
