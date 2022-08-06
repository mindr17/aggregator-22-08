import { booleanCategoryType, ICartController, IFilterField, IFilters, IGood } from "../frontendTypes";

export class GoodsModel {
  onUpdate: any;
  private _goods: IGood[];

  constructor(cartController?: ICartController) {
    this.onUpdate = () => {
      throw new Error('Still empty!');
    };
    this._goods = [];
  }

  public async update(filters: Partial<IFilters>) {
    this._goods = await this.load(filters);
    this.onUpdate({
      goods: this._goods,
    });
  }

  public async load(filters: Partial<IFilters>): Promise<IGood[]> {
    // console.log(process.env.deploy);
    
    const goods: Array<IGood> = await this.getGoodsFromBackend(filters) as Array<IGood>;

    if (typeof goods === 'undefined') throw new Error('got bad response');

    goods.forEach((good: IGood) => {
      if (typeof good === 'undefined') throw new Error('got bad response');
    });

    return goods;
  }

  private async getGoodsFromBackend(filters: Partial<IFilters>): Promise<Array<IGood>> {
      if (process.env.deploy === 'production') {
        console.log(`mode = ${process.env.deploy}`);
      }

      const resolveBaseUrl = () => {        
          if (process.env.deploy === 'local') {
            return 'http://localhost:4333/goods'
          }
          
          return 'http://localhost:4333/goods'
      }

      const baseUrl: string = resolveBaseUrl();

      const getBooleans = (filters: Partial<IFilters>, category: IFilterField): string => {
        if (
          typeof category !== 'string'
          || typeof filters[category] !== 'object'
          || typeof filters[category] === 'undefined'
        ) {
          return '';
        }

        const booleans: booleanCategoryType = filters[category];
        const urlParts: Array<string> = [];

        if (
          Object.values(booleans).every(value => value === true)
          || Object.values(booleans).every(value => value === false)
        ) {
          return '';
        }

        for (const field in booleans) {
          const booleanField: boolean = booleans[field];

          if (typeof booleanField !== 'boolean') {
            throw new Error(`${booleanField} is not boolean`);
          }

          if (booleanField) urlParts.push(`${field}`);
        }

        const values: string = urlParts.join('%');

        return `?${category}=${values}`;
      };

      const parts: Array<string> = [];

      const color: string = getBooleans(filters, 'color');
      parts.push(color);

      const manufacturer: string = getBooleans(filters, 'manufacturer');
      parts.push(manufacturer);

      const size: string = getBooleans(filters, 'size');
      parts.push(size);

      const urlParams: string = parts.join('');
      
      const url: string = baseUrl;
      
      const response = await fetch(url,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'text/plain',
          },
          body: JSON.stringify(filters),
        },
      );
      
      if (typeof response === 'undefined') throw new Error('got undefined from backend');
      
      const goods = await response.json();
      
      if (typeof goods === 'undefined') throw new Error('got bad response from backend');
      
      goods.forEach((good: IGood) => {
        if (typeof good === 'undefined') throw new Error('got bad response from backend');
      });

      const state: object = {};
      const title: string = urlParams;
      history.pushState(state, title, `/${urlParams}`);

      return goods;
  }
}
