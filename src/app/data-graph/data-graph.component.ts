import { Component, OnChanges, Input, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { ApiSportsCovidData } from '../api-sports-covid-data-array';

@Component({
  selector: 'app-data-graph',
  templateUrl: './data-graph.component.html',
  styleUrls: ['./data-graph.component.scss']
})
export class DataGraphComponent implements OnChanges {

  constructor() { }

  @ViewChild('dataChart') chartElement: ElementRef;
  @Input() timelineData: ApiSportsCovidData[];
  @Input() yVariable: string;
  @Input('category') yVariableCategory: string;
  @Input() currentDate: string;

  parseDate = d3.timeParse('%Y-%m-%d');
  private svgElement: HTMLElement;
  private chartProps: any;

  formatDate() {
    this.timelineData.forEach(datum => {
      if (typeof datum.day === 'string') {
        datum.day = this.parseDate(datum.day);
      }
    });
  }

  createGraph(yVariable: string, yVariableCategory: string): void {

    this.chartProps = {};
    this.formatDate();

    // Set the dimensions of the canvas / graph
    var margin = { top: 30, right: 20, bottom: 30, left: 70 },
    width = 500 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

    // Set the ranges
    this.chartProps.x = d3.scaleTime().range([0, width]);
    this.chartProps.y = d3.scaleLinear().range([height, 0]);

    // Define the axes
    var xAxis = d3.axisBottom(this.chartProps.x);
    var yAxis = d3.axisLeft(this.chartProps.y);

    let _this = this;

    var currentDay;
    var filteredByDay = _this.timelineData.filter((item) => {
      let temp = item.day.getDate().toString().padStart(2, '0')
      if (temp !== currentDay) {
        currentDay = temp;
        return true;
      }
      return false;
    });
    
    // Define the line
    var valueline = d3.line<ApiSportsCovidData>()
    .x(function (d) {
      if (d.day instanceof Date) {
        return _this.chartProps.x(d.day.getTime());
      }
    })
    .y(function (d) { 
      if (d[yVariable][yVariableCategory] === null) {
        return _this.chartProps.y(d[yVariable][yVariableCategory]);
      }
        return _this.chartProps.y(parseInt(d[yVariable][yVariableCategory])); 
     });


    // Define the line
    // var valueline2 = d3.line<ApiSportsCovidData>()
    // .x(function (d) {
    //   if (d.day instanceof Date) {
    //     return _this.chartProps.x(d.day.getTime());
    //   }
    // })
    // .y(function (d) { return _this.chartProps.y(d.population); });

    var svg = d3.select(this.chartElement.nativeElement)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

    // Scale the range of the data
    this.chartProps.x.domain(
      d3.extent(_this.timelineData, function (d) {
        if (d.day instanceof Date)
          return (d.day as Date).getTime();
      }));
    this.chartProps.y.domain([0, d3.max(this.timelineData, function (d) {
      return parseInt(d[yVariable][yVariableCategory]);
    })]);

    // Add the valueline2 path.
    // svg.append('path')
    // .attr('class', 'line line2')
    // .style('stroke', 'green')
    // .style('fill', 'none')
    // .attr('d', valueline2(_this.timelineData));

    // Add the valueline path.
    svg.append('path')
      .attr('class', 'line line1')
      .style('stroke', 'rgba(192,29,29,1)')
      .style('fill', 'none')
      .attr('d', valueline(filteredByDay));


    // Add the X Axis
    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis);

    // Add the Y Axis
    svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis);

    // Setting the required objects in chartProps so they could be used to update the chart
    this.chartProps.svg = svg;
    this.chartProps.valueline = valueline;
    // this.chartProps.valueline2 = valueline2;
    this.chartProps.xAxis = xAxis;
    this.chartProps.yAxis = yAxis;
  }

  ngOnChanges(): void {
    d3.select(this.chartElement.nativeElement).html(null);
    if (this.timelineData){
      this.createGraph(this.yVariable, this.yVariableCategory);
    }
  }

}
