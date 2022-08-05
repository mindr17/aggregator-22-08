import { IFilters, IGood, IRange } from "../../../../../frontend-ts/src/scripts/types";

export const sortAZ = (goods: Array<IGood>, filters: Partial<IFilters>) => {
  if (filters.sort === 'sortAZ') {
    goods = goods.sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
  }

  return goods;
};
