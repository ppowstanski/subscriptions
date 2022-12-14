import {Component, OnInit} from '@angular/core';
import {CarModel} from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'subscriptions';

  CarModel = CarModel;
  selectedCarModel = CarModel.A8

  isDataDisplaying = true;

  constructor() {
  }

  turnOnOfDataPresentation() {
    this.isDataDisplaying = !this.isDataDisplaying;
  }
}
