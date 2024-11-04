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

  constructor(
    private openWeatherMapService: OpenWeatherMapService,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit() {
    this.weathers = this.localStorage.getAllWeathers();

    this.openWeatherMapService.getCity().subscribe(data => {
      const weatherAlreadyExistsIndex = this.weathers.findIndex(w => w.name === data.name);
      if (weatherAlreadyExistsIndex !== -1) {
        data.favorited = true; // already in cache, saved by user
        this.weathers[weatherAlreadyExistsIndex] = data;
      }
      if (weatherAlreadyExistsIndex === -1) {
        this.weathers.push(data)
      }
    })
  }
}
