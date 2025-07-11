import {Component, Input} from '@angular/core';
import {Country} from '../app'

@Component({
  selector: 'app-country-detail',
  imports: [],
  templateUrl: './country-detail.html',
  styleUrl: './country-detail.sass'
})
export class CountryDetail {
  @Input() country: Country;

  constructor() {
    this.country = {
      iso2: '',
      iso3: '',
      country: '',
      cities: []
    };
  }
}
