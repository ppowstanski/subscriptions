import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CarModel, Market, MarketRate} from '../models';
import {SalesDataStoreService} from '../sales-data.store';
import {Observable, pipe, Subject, Subscription, takeUntil} from 'rxjs';

@Component({
  selector: 'app-subscription-component',
  templateUrl: './subscription-component.component.html',
  styleUrls: ['./subscription-component.component.scss']
})
export class SubscriptionComponentComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();

  private static NUMBER_OF_SUBSCRIPTIONS = 0;

  Market = Market;

  private _selectedModel!: CarModel;
  private _marketRates!: MarketRate;

  @Input() set model(value: CarModel) {
    this.unsubscribe$.next();
    this.unsubscribe$ = new Subject<void>();

    this._selectedModel = value;

    SubscriptionComponentComponent.NUMBER_OF_SUBSCRIPTIONS++;
    const currentSubscription = SubscriptionComponentComponent.NUMBER_OF_SUBSCRIPTIONS;

    this.fetchMarketRates()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(rates => {
      this._marketRates = rates;
      console.log('fetchMarketRates callback ', currentSubscription);
    });
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

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }
}

