import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OpenWeatherMapResponse } from '../services/open-weather-map.service';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.page.html',
  styleUrls: ['./weather-details.page.scss'],
})
export class WeatherDetailsPage implements OnInit {
  constructor(private location: Location, private router: Router) { }
  weather!: OpenWeatherMapResponse;
  weatherCode: number | null = null;
  weatherStatus: string | null = null;
  temperature!: number;
  humidity!: number;
  
  ngOnInit(): void {
    const url = this.router.url;
    const decodedUrl = decodeURI(url.split("/")[2]);

    this.weather = JSON.parse(decodedUrl);
    this.weatherCode = this.weather.weather[0]?.id;
    this.weatherStatus = this.capitalizeFirstLetter(this.weather.weather[0]?.description);
    this.temperature = this.weather.main.temp;
    this.humidity = this.weather.main.humidity;
  }

  goBack() {
    this.location.back()
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

  private capitalizeFirstLetter(str: string | null) {
    if (!str) return null
    return str[0].toUpperCase() + str.slice(1)
  }
}
