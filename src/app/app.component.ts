import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'COVID19Stats';

  mostRecentCases: object = {};
  mostRecentDeaths: object = {};
  mostRecentTests: object = {};
  fullDailyData: object[] = null;

  selectedCountry: string = '';
  selectedDate: string = '';
  queriedCountry: string = '';
  queriedDate: string = '';

  yVariable: string = "cases";
  yVariableCategory: string = "active";

  isWaiting: boolean = false;

  changeSelectedCountry(newCountry: string): void {
    this.selectedCountry = newCountry;
  }

  changeSelectedDate(newDate: string): void {
    this.selectedDate = newDate;
  }

  changeYVariable(newYVariable: string[]) {
    this.yVariable = newYVariable[0];
    this.yVariableCategory = newYVariable[1];
  }

  queryAPI() {
    if (this.selectedCountry == '') {
      return;
    }
    this.fullDailyData = null;
    this.isWaiting = true;
    fetch(`https://covid-193.p.rapidapi.com/history?day=${this.selectedDate}&country=${this.selectedCountry}`, {
          "method": "GET",
          "headers": {
            "x-rapidapi-host": "covid-193.p.rapidapi.com",
            "x-rapidapi-key": "93676dd7d2mshe8e58bcb99bd228p1e80e8jsn09ed48cb759e"
          }
    })
    .then(response => response.json())
    .then(responseJson => {
      // get full history
        fetch(`https://covid-193.p.rapidapi.com/history?country=${this.selectedCountry}`, {
            "method": "GET",
            "headers": {
              "x-rapidapi-host": "covid-193.p.rapidapi.com",
              "x-rapidapi-key": "93676dd7d2mshe8e58bcb99bd228p1e80e8jsn09ed48cb759e"
            }
        })
        .then(response => response.json())
        .then(responseJsonFull => {
          // turn off loading icon
          this.isWaiting = false;

          // confirm query strings
          this.queriedCountry = this.selectedCountry;
          this.queriedDate = this.selectedDate;

          //set response data
          this.fullDailyData = responseJsonFull.response || null;
          this.mostRecentCases = (responseJson.response[0] && responseJson.response[0].cases) || {};
          this.mostRecentDeaths = (responseJson.response[0] && responseJson.response[0].deaths) || {};
          this.mostRecentTests = (responseJson.response[0] && responseJson.response[0].tests) || {};
        })
    })
    .catch(err => {
      console.log(err);
    });
  }

  ngOnInit(): void {
    let today = new Date();
    let dd: string = today.getDate().toString().padStart(2, '0');
    let mm: string = (today.getMonth() + 1).toString().padStart(2, '0');
    let yyyy: string = today.getFullYear().toString();
    this.selectedDate = `${yyyy}-${mm}-${dd}`;
  }
}
