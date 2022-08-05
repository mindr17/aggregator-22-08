import { IFilters, IGood } from "../../../../types"

export const searchFilter = (good: IGood, filters: Partial<IFilters>) => {
  if (!filters.search) return true;

  const searchText: string = filters.search.toLocaleLowerCase();
  const goodName: string = good.name.toLocaleLowerCase();

  const contains = goodName.includes(searchText);

  if (contains) return true;
};
