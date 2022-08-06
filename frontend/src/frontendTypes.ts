interface IApp {
  start: () => void;
}

type sortType = 'sortAZ' | 'sortZA' | 'yearAscending' | 'yearDescending';

type ISortFields = {
  [key in sortType]: object;
};

interface IGood {
  [key: string]: string | object | boolean | number;
  img: string,
  name: string,
  manufacturer: string,
  color: string,
  size: string,
  count: number,
  year: number,
  popular: boolean,
}

interface IManufacturerState {
  [key: string]: boolean;
  fiery: boolean;
  lacoste: boolean;
  tom: boolean;
}

interface IColor {
  [key: string]: boolean;
  white: boolean;
  black: boolean;
  red: boolean;
}

interface ISize {
  [key: string]: boolean;
  s: boolean;
  m: boolean;
  l: boolean;
}

interface IRange {
  from: number,
  to: number,
}

interface IRange {
  from: number;
  to: number;
}

type IFilterField = object | boolean | number | sortType | string | [key: string];

interface IFilters {
  [key: string]: IFilterField | boolean | string;
  manufacturer: IManufacturerState;
  color: {
    white: boolean;
    black: boolean;
    red: boolean;
  }
  size: {
    s: boolean;
    m: boolean;
    l: boolean;
  }
  popular: boolean;
  count: {
    from: number;
    to: number;
  };
  year: {
    from: number;
    to: number;
  };
  search: string;
  sort: sortType;
}

interface IGoodsPresenter {
  init: () => Promise<void>;
  applyFilters: (filters: IFilters) => Promise<void>;
}

type fieldChangeType = (fieldName: sortType | string, fileldSettings: IFilterField) => Promise<void>;

interface IFiltersController {
  resetFilters: () => void;
  resetSettings: () => void;
  getFilters: () => IFilters;
  fieldChange: fieldChangeType;
}

interface ICartModel {
  onUpdate: (current: Array<IGood>, last: Array<IGood>) => void;
  getState: () => Array<IGood> | [];
  setState: (goods: Array<IGood> | []) => void;
}

interface ICartController {
  clearCart: () => void;
  checkIfInCart: (good: IGood) => boolean;
  removeFromCart: (good: IGood) => void;
  addToCart: (good: IGood) => boolean;
  getCartLength: () => number;
}

interface ICartView {
  cartController: ICartController;
}

type booleanCategoryType = {
  [key: string]: boolean;
}

type IOptions = Partial<IFilters>;

enum sortAZEnum {
  fieldName = 'sortAZ',
  description = 'По названию, от А до Я',
}

enum sortZAEnum {
  fieldName = 'sortZA',
  description = 'По названию, от Я до А',
}

enum yearAscendingEnum {
  fieldName = 'yearAscending',
  description = 'По году, по возрастанию',
}

enum yearDescendingEnum {
  fieldName = 'yearDescending',
  description = 'По году, по убыванию',
}

export {
  type sortType,
  type IFilterField,
  type fieldChangeType,
  type IApp,
  type IGood,
  type ICartModel,
  type ICartController,
  type ISortFields,
  type ICartView,
  type IManufacturerState,
  type IColor,
  type ISize,
  type IRange,
  type IGoodsPresenter,
  type IFiltersController,
  type IFilters,
  type IOptions,
  type booleanCategoryType,
  sortAZEnum,
  sortZAEnum,
  yearAscendingEnum,
  yearDescendingEnum,
};
