import { Component, OnInit } from '@angular/core';
import { OpenMeteoService } from '../services/open-meteo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  temperature: number | null = null;
  humidity: number | null = null;
  weatherCode: number | null = null;

  constructor(private openMeteoService: OpenMeteoService) { }

  ngOnInit() {
    this.openMeteoService.fetchCities().subscribe(data => {
      this.temperature = this.openMeteoService.getCurrentTemperature(data);
      this.humidity = this.openMeteoService.getCurrentHumidity(data);
      this.weatherCode = this.openMeteoService.getCurrentWeatherCode(data);
    })
  }
}
