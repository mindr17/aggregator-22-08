import { IFilters, IGood, IRange } from "../../../../../frontend-ts/src/scripts/types";

export const sortZA = (goods: Array<IGood>, filters: Partial<IFilters>) => {
  if (filters.sort === 'sortZA') {
    goods = goods.sort((a, b) => {
      return b.name.localeCompare(a.name);
    });
  }

  return goods;
};
