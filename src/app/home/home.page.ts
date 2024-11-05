import { Component, OnInit } from '@angular/core';
import { OpenWeatherMapResponse, OpenWeatherMapService } from '../services/open-weather-map.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  weathers: OpenWeatherMapResponse[] = [];
  latitude: number = -8.0539;
  longitude: number = -34.8811;

  constructor(
    private openWeatherMapService: OpenWeatherMapService,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit() {
    const weathersInCache = this.localStorage.getWeathersInCache();
    this.weathers = [...weathersInCache];

    this.openWeatherMapService.getSurroundingCities(this.latitude, this.longitude, 0.1).subscribe(data => {
      data.forEach((weather) => {
        const cityNames = this.weathers.map(w => w.name);
        const alreadyFetched = cityNames.includes(weather.name);
        if (alreadyFetched) {
          return
        }

        const cacheCityNames = weathersInCache.map(w => w.name);
        const alreadyInCache = cacheCityNames.includes(weather.name);

        if (alreadyInCache) {
          weather.favorited = true; // already in cache, saved by user

          const index = cityNames.indexOf(weather.name);
          this.weathers[index] = weather;
        }
        if (!alreadyInCache) {
          weather.main.temp = Math.round(weather.main.temp);
          this.weathers.push(weather);
        }
      })
    })
  }
}
