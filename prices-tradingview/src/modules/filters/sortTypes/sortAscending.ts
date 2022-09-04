import { IFilters, IGood, IRange } from "../../../../../frontend-ts/src/scripts/types";

export const yearAscending = (goods: Array<IGood>, filters: Partial<IFilters>) => {
  if (filters.sort === 'yearAscending') {
    goods.sort((a, b) => {
      return a.year - b.year;
    });
  }
  
  return goods;
};
