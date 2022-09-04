import { IFilters, IGood, IRange } from "../../../../../frontend-ts/src/scripts/types";

export const yearDescending = (goods: Array<IGood>, filters: Partial<IFilters>) => {
  if (filters.sort === 'yearDescending') {
    goods.sort((a, b) => {
      return b.year - a.year;
    });
  }
  
  return goods;
};
