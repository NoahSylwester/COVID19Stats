import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  constructor() { }

  countries: string[];
  currentCountry: string;

  @Output() countryChange = new EventEmitter()

  countryChanged(value: string): void {
    this.currentCountry = value;
    this.countryChange.emit(this.currentCountry);
  }

  ngOnInit(): void {
    fetch("https://covid-193.p.rapidapi.com/countries", {
          "method": "GET",
          "headers": {
            "x-rapidapi-host": "covid-193.p.rapidapi.com",
            "x-rapidapi-key": "b7ece58cddmsh492adbb2d0e2f6fp19717djsnc1c02a305ff9"
          }
    })
    .then(response => response.json())
    .then(responseJson => {
      this.countries = responseJson.response;
    })
    .catch(err => {
      console.log(err);
    });
  }

}
