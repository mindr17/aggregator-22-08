import { IFilters, IGood } from "../../../../frontend-ts/src/scripts/types";
import { yearAscending } from "./sortTypes/sortAscending";
import { sortAZ } from "./sortTypes/sortAZ";
import { yearDescending } from "./sortTypes/sortDescending";
import { sortZA } from "./sortTypes/sortZA";

export const useSorter = (goods: Array<IGood>, filters: Partial<IFilters>) => {
  
  sortAZ(goods, filters);
  
  sortZA(goods, filters);
  
  yearAscending(goods, filters);
  
  yearDescending(goods, filters);

  return goods;
};
