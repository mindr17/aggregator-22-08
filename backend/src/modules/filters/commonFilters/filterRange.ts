import { IFilters, IGood, IRange } from "../../../../../frontend-ts/src/scripts/types";

export const filterRange = (props: {
  good: IGood,
  filters: Partial<IFilters>,
  fieldName: string,
}) => {
  if (!props.filters[props.fieldName]) return true;

  const field: IRange = props.filters[props.fieldName] as unknown as IRange;

  const from: number = field.from;
  const to: number = field.to;
  
  if (props.good[props.fieldName] < from) return false;
  if (props.good[props.fieldName] > to) return false;
  
  return true;
};
