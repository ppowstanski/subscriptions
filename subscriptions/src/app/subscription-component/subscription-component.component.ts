import {Component, Input, OnInit} from '@angular/core';
import {CarModel, Market, MarketRate} from '../models';
import {SalesDataStoreService} from '../sales-data.store';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-subscription-component',
  templateUrl: './subscription-component.component.html',
  styleUrls: ['./subscription-component.component.scss']
})
export class SubscriptionComponentComponent implements OnInit {

  Market = Market;

  private _selectedModel!: CarModel;
  private _marketRates!: MarketRate;

  @Input() set model(value: CarModel) {
    this._selectedModel = value;
    this.fetchMarketRates().subscribe(rates => this._marketRates = rates);
  }

  constructor(private salesDataStore: SalesDataStoreService) {
  }

  ngOnInit(): void {
  }

  get selectedModel(): CarModel {
    return this._selectedModel;
  }

  get marketRates(): MarketRate {
    return this._marketRates;
  }

  fetchMarketRates(): Observable<MarketRate>{
    return this.salesDataStore.salesData(this.selectedModel);
  }
}

