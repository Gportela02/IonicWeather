import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss'],
})
export class WeatherCardComponent {
  constructor() { }
  @Input() cityName!: string;
  @Input() temperature!: number;
  @Input() weatherStatus!: WEATHER_STATUS;
  @Input() umidity!: number;
  @Input() isFavorited: boolean = false;

  favoriteCard() {
    this.isFavorited = !this.isFavorited;
  }
}
