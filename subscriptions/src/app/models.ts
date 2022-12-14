export enum CarModel {
  A1 = 'A1',
  A6 = 'A6',
  A8 = 'A8',
}

export enum Market {
  WORLD = 'WORLD',
  GERMANY = 'GERMANY',
  CHINA = 'CHINA',
}

export type MarketRate = { [market in Market]: number };
export type SalesData = { [model in CarModel]: MarketRate };
