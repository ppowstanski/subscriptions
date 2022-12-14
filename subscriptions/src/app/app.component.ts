import {Component, OnInit} from '@angular/core';
import {CarModel} from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'subscriptions';

  CarModel = CarModel;
  selectedCarModel = CarModel.A8

  constructor() {
  }

  ngOnInit(): void {
  }

  onCarModelChange($event: string) {
    console.log($event);
  }
}
