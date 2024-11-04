import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss'],
})
export class WeatherCardComponent {
  constructor() { }
  @Input() cityName!: string | null;
  @Input() temperature!: number | null;
  @Input() weatherCode!: number | null;
  @Input() humidity!: number | null;
  @Input() weatherStatus!: string | null;
  @Input() isFavorited: boolean = false;

  favoriteCard() {
    this.isFavorited = !this.isFavorited;
  }

  getWeatherIcon(weatherCode: number | null): number | null {
    if (weatherCode === null) return null;
    if (weatherCode === 800) return 0; // sunny
    if ((weatherCode >= 700 && weatherCode < 800) || weatherCode > 800) return 1; // cloudy
    if (weatherCode >= 300 && weatherCode < 600) return 2; // rainy
    if (weatherCode >= 200 && weatherCode < 300) return 3; // thunderstorm
    if (weatherCode >= 600 && weatherCode < 700) return 4; // snow

    return null;
  }
}
