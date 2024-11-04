import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss'],
})
export class WeatherCardComponent {
  constructor() { }
  @Input() cityName!: string;
  @Input() temperature!: number | null;
  @Input() weatherCode!: number | null;
  @Input() humidity!: number | null;
  @Input() isFavorited: boolean = false;

  favoriteCard() {
    this.isFavorited = !this.isFavorited;
  }
}
