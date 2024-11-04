import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface OpenMeteoResponse {
  latitude: number,
  longitude: number,
  generationtime_ms: number,
  utc_offset_seconds: number,
  timezone: string,
  timezone_abbreviation: string,
  elevation: number,
  hourly_units: {
    temperature_2m: string,
    relative_humidity_2m: string,
    weathercode: string,
  },
  hourly: {
    time: string[],
    temperature_2m: number[],
    relative_humidity_2m: number[],
    weathercode: number[]
  }
}

@Injectable({
  providedIn: 'root'
})
export class OpenMeteoService {

  private url = "https://api.open-meteo.com/v1";

  constructor(private httpClient: HttpClient) { }

  fetchCities(): Observable<OpenMeteoResponse> {
    const hourlyParams = [
      "temperature_2m",
      "relative_humidity_2m",
      "weathercode",
    ];

    const params = new URLSearchParams({
      latitude: "-8.047",
      longitude: "-34.8770",
      hourly: hourlyParams.join(","),
    });

    return this.httpClient.get(this.url + "/forecast?" + params.toString()) as Observable<OpenMeteoResponse>;
  }

  getCurrentTemperature(data: OpenMeteoResponse): number | null {
    const i = this.getCurrentTimeIndex(data);
    return data.hourly.temperature_2m[i] ?? null;
  }

  getCurrentHumidity(data: OpenMeteoResponse): number | null {
    const i = this.getCurrentTimeIndex(data);
    return data.hourly.relative_humidity_2m[i] ?? null;
  }

  getCurrentWeatherCode(data: OpenMeteoResponse): number | null {
    const i = this.getCurrentTimeIndex(data);
    return data.hourly.weathercode[i] ?? null;
  }

  private getCurrentTimeIndex(data: OpenMeteoResponse): number {
    const now = new Date().getHours();
    return data.hourly.time.findIndex((time) => {
      const hour = new Date(time).getHours();
      return hour === now;
    });
  }
}
