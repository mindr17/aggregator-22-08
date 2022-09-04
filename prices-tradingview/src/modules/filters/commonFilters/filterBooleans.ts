import { IFilters, IGood, IRange } from "../../../../../frontend-ts/src/scripts/types";

type booleansFilterType = {
  [key: string]: boolean;
};

export const filterBooleans = ({
  good,
  filters,
  fieldName
}: {
  good: IGood;
  filters: Partial<IFilters>;
  fieldName: string;
}): boolean => {
  const filtersField: booleansFilterType = filters[fieldName] as booleansFilterType;
  if (!filtersField) return true;

  const goodValueAnyCased = good[fieldName];
  if (typeof goodValueAnyCased !== 'string') throw new Error('invalid type');

  const goodValue: string = goodValueAnyCased.toLowerCase();

  if (Object.values(filtersField).every(value => !value)) return true;
  
  if (typeof filtersField !== 'object') return true;

  if (!filtersField) return true;

  if (typeof filtersField === 'string') return true;
  if (typeof filtersField === 'boolean') return true;
  if (typeof filtersField === 'number') return true;
  if (typeof filtersField !== 'object') return true;

  if (filtersField[goodValue] === true) return true;

  return false;
};
