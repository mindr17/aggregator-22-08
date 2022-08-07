// import { IFilters, IGood } from "../../../frontend/src/scripts/types";
import { IUrlParams } from "../backendTypes";
import { goodsDb } from './goodsDb';
import { filterBooleans } from './filters/commonFilters/filterBooleans'
import { filterRange } from './filters/commonFilters/filterRange'
import { useSorter } from './filters/useSorter'
import { searchFilter } from './filters/searchFilter'

export class BackendModel {
  private _goods: Array<IGood>;

  constructor() {
    this._goods = goodsDb;
  }

  public getGoods(filters: Partial<IFilters>) {

    const filteredGoods = this._goods.filter(good => {
      if (!filters) return true;
      
      if (!filterBooleans({
        good,
        filters,
        fieldName: 'manufacturer'
      })) return false;

      if (!filterBooleans({
        good,
        filters,
        fieldName: 'color'
      })) return false;

      if (!filterBooleans({
        good,
        filters,
        fieldName: 'size'
      })) return false;

      if (
        filters.popular
        && good.popular !== filters.popular
      ) return false;

      if (!filterRange({
        good,
        filters,
        fieldName: 'count',
      })) return false;

      if (!filterRange({
        good,
        filters,
        fieldName: 'year',
      })) return false;
      
      if (!searchFilter(good, filters)) return false;

      return true;
    });

    const sortedGoods = useSorter(filteredGoods, filters);
    
    return sortedGoods;
  }
}
