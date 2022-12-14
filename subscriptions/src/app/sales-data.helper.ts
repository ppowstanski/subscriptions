import {transform} from 'lodash';

import {Market, SalesData} from './models';

export const increaseSale = (data: SalesData) => {
  return transform(
    data,
    (acc: SalesData, value: any, key: any) => {
      return Object.assign(acc, {
        [key]: {
          [Market.WORLD]: value[Market.WORLD] + 2,
          [Market.GERMANY]: value[Market.GERMANY] + 1,
          [Market.CHINA]: value[Market.CHINA] + 1,
        },
      });
    },
    {} as any
  );
};
