import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CarModel, Market, MarketRate} from '../models';
import {SalesDataStoreService} from '../sales-data.store';
import {BehaviorSubject, filter, Observable, ReplaySubject, Subject, switchMap, takeUntil, tap} from 'rxjs';

@Component({
  selector: 'app-subscription-component',
  templateUrl: './subscription-component.component.html',
  styleUrls: ['./subscription-component.component.scss']
})
export class SubscriptionComponentComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();
  private selectedModeSubject = new ReplaySubject<CarModel>();

  private static NUMBER_OF_SUBSCRIPTIONS = 0;

  Market = Market;

  private _marketRates!: MarketRate;

  @Input() set model(value: CarModel) {
    this.selectedModeSubject.next(value);
  }

  constructor(private salesDataStore: SalesDataStoreService) {
  }

  ngOnInit(): void {
    this
      .selectedModeSubject
      .asObservable()
      .pipe(
        takeUntil(this.unsubscribe$),
        switchMap(model => this.fetchMarketRates(model)),
      ).subscribe(data => this._marketRates = data);
  }

  get selectedModel(): Observable<CarModel> {
    return this.selectedModeSubject.asObservable();
  }

  get marketRates(): MarketRate {
    return this._marketRates;
  }

  get isDataPresent(): boolean {
    return !!this.marketRates;
  }

  fetchMarketRates(carModel: CarModel): Observable<MarketRate> {
    return this.salesDataStore.salesData(carModel);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

