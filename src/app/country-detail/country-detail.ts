import {Component, Input} from '@angular/core';
import {Country} from '../app'
import {HttpClient} from "@angular/common/http";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-country-detail',
  imports: [MatButtonToggleGroup, MatButtonToggle, FormsModule],
  templateUrl: './country-detail.html',
  styleUrl: './country-detail.sass'
})
export class CountryDetail {
  private _country: Country;

  protected _myUnits: string = 'metric';
  @Input()
  get myUnits(): string { return this._myUnits; }
  set myUnits(unit: string) {
    this._myUnits = unit;

    this.updateWeatherData();
  }

  private mySub: any = null;

  @Input()
  get country(): Country { return this._country; }
  set country(con: Country) {
    this._country = con;
    this.updateWeatherData();
  }

  protected myWeatherData: any = null;

  updateWeatherData() {
    if (!!this.mySub) {
      this.mySub.unsubscribe();
    }
    if (!!this._country.country)
    {
      this.mySub = this.http.get<WeatherData>('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          q: this._country.country,
          units: this.myUnits,
          APPID: '794ee95e63c5a32aaf88cd813fa2e425'
        },
      }).subscribe(weatherData => {
        // process the configuration.
        this.myWeatherData = weatherData;
      });
    }
  }

  constructor(protected http: HttpClient) {
    this._country = {
      iso2: '',
      iso3: '',
      country: '',
      cities: []
    };
  }
}

interface WeatherData {
  data: Country[];
  error: boolean;
  msg: string;
}
