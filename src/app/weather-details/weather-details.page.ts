import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OpenWeatherMapResponse } from '../services/open-weather-map.service';
import { OpenMeteoService } from '../services/open-meteo.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.page.html',
  styleUrls: ['./weather-details.page.scss'],
})
export class WeatherDetailsPage implements OnInit {
  constructor(
    private location: Location,
    private router: Router,
    private openMeteoService: OpenMeteoService,
    private localStorage: LocalStorageService,
  ) { }

  weather!: OpenWeatherMapResponse;
  weatherCode: number | null = null;
  weatherStatus: string | null = null;
  temperature!: number;
  humidity!: number;
  isFavorited!: boolean;

  selectedDate: Date = new Date();

  hourlyData: Array<{
    temperature: number
    humidity: number
    time: Date
  }> = []
  
  ngOnInit(): void {
    const url = this.router.url;
    const decodedUrl = decodeURI(url.split("/")[2]);

    this.weather = JSON.parse(decodedUrl);
    this.weatherCode = this.weather.weather[0]?.id;
    this.weatherStatus = this.capitalizeFirstLetter(this.weather.weather[0]?.description);
    this.temperature = this.weather.main.temp;
    this.humidity = this.weather.main.humidity;
    this.isFavorited = this.weather.favorited

    this.getHourlyWeatherData(this.weather.coord.lat, this.weather.coord.lon);
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

  getHourlyWeatherData(lat: number, lon: number) {
    this.openMeteoService.getCity(lat, lon).subscribe((data) => {
      const today = new Date();
      const minIndex = data.hourly.time.findIndex((weather) => {
        const date = new Date(weather);
        if (date.getDate() === today.getDate()) {
          return date.getHours() === today.getHours()
        }

        return false;
      })

      this.hourlyData = data.hourly.time
        .filter((_, i) => i >= minIndex)
        .map((time) => new Date(time))
        .sort((a, b) => a.getTime() - b.getTime())
        .map((time, i) => ({
          humidity: data.hourly.relative_humidity_2m[i],
          temperature: data.hourly.temperature_2m[i],
          time,
        }));
    });
  }

  favoriteCard() {
    this.isFavorited = !this.isFavorited;
    if (this.isFavorited) {
      this.localStorage.saveWeather(this.weather);
    }
    if (!this.isFavorited) {
      this.localStorage.removeWeather(this.weather);
    }
  }
}
