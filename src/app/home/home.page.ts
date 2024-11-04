import { Component, OnInit } from '@angular/core';
import { OpenWeatherMapService } from '../services/open-weather-map.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  temperature: number | null = null;
  humidity: number | null = null;
  weatherCode: number | null = null;
  weatherStatus: string | null = null;
  cityName: string | null = null;

  constructor(private openWeatherMapService: OpenWeatherMapService) { }

  ngOnInit() {
    this.openWeatherMapService.getCity().subscribe(data => {
      this.temperature = data.main.temp;
      this.humidity = data.main.humidity;
      this.weatherCode = data.weather[0]?.id || null;
      this.weatherStatus = data.weather[0]?.description || null;
      this.cityName = data.name;
    })
  }
}
