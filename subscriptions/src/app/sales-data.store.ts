import {BehaviorSubject, interval, map, Observable} from 'rxjs';
import {CarModel, MarketRate, SalesData} from './models';
import {increaseSale} from './sales-data.helper';
import {Injectable} from '@angular/core';

const initialData: SalesData = {
  A1: {
    CHINA: 5,
    GERMANY: 2,
    WORLD: 7,
  },
  A6: {
    CHINA: 3,
    GERMANY: 1,
    WORLD: 4,
  },
  A8: {
    CHINA: 2,
    GERMANY: 2,
    WORLD: 4,
  },
};

@Injectable({providedIn: 'root'})
export class SalesDataStoreService {
  private salesStoreSubject = new BehaviorSubject<SalesData>(initialData);

  constructor() {
    interval(2500).pipe().subscribe(() => {
      const increasedSale = increaseSale(this.salesStoreSubject.value);
      this.salesStoreSubject.next(increasedSale);
    });
  }

  salesData(carModel: CarModel): Observable<MarketRate> {
    return this.salesStoreSubject.asObservable().pipe(map(data => data[carModel]));
  }
}
