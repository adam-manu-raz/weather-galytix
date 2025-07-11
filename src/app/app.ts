import {Component, OnDestroy, OnInit, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {MatSort, MatSortHeader, Sort} from "@angular/material/sort";
import {CountryDetail} from "./country-detail/country-detail";
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSortHeader, MatSort, CountryDetail, NgStyle],
  templateUrl: './app.html',
  styleUrl: './app.sass'
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('weather-galytix');

  protected countries: Country[];
  protected sortedCountries: Country[];

  protected selectedCountry: Country;

  constructor(protected http: HttpClient) {
    this.countries = [];
    this.sortedCountries = [];
    this.selectedCountry = {
      iso2: '',
      iso3: '',
      country: '',
      cities: []
    };
  }

  private mySub: any;

  ngOnInit() {
    this.mySub = this.http.get<Config>('https://countriesnow.space/api/v0.1/countries').subscribe(config => {
      // process the configuration.
      this.countries = config.data;
      this.sortedCountries = this.countries.slice();
    });
  }

  selectCon(con: Country) {
    this.selectedCountry = con;
  }

  sortData(sort: Sort) {
    const data = this.countries.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedCountries = data;
      return;
    }

    this.sortedCountries = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'country':
          return compare(a.country, b.country, isAsc);
        case 'iso3':
          return compare(a.iso3, b.iso3, isAsc);
        case 'iso2':
          return compare(a.iso2, b.iso2, isAsc);
        default:
          return 0;
      }
    });
  }

  ngOnDestroy() {
    this.mySub.unsubscribe();
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

interface Config {
  data: Country[];
  error: boolean;
  msg: string;
}
export interface Country {
  iso2: string;
  iso3: string;
  country: string;
  cities: string[];
}
