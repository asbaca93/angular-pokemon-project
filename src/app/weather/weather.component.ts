import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs';
import { WeatherService } from '../weather.service';

export interface Weather {
  date: string,
  tempuratureC: number,
  tempuratureF: number,
  summary: string,
};

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  weathers: Array<Weather>;
  constructor(private weatherService: WeatherService) {
    this.weathers = [];
  }

  ngOnInit(): void {
    this.getWeather().subscribe();
  }

  getWeather() {
    return this.weatherService.getWeather().pipe(
      filter(result => (result) ? true : false),
      map(result => { console.log(result); this.weathers = result;}),
      
    )
  }
}
