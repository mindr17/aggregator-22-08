import styles from './Filters.module.scss';
import cls from 'classnames';
import Image from 'next/image';

const Filters = (props: any) => {
  // this._filtersElem = props.filtersElem;
  // const filtersFirst = createAppend(this._filtersElem, 'div', 'filters__block');
  // createAppend(filtersFirst, 'div', 'filters__header', 'Фильтры по значению');
  // this.manufacturer = new Manufacturer(filtersFirst, this.filtersController.fieldChange);
  // this.color = new Color(filtersFirst, this.filtersController.fieldChange);
  // this.size = new Size(filtersFirst, this.filtersController.fieldChange);
  // this.popular = new Popular(filtersFirst, this.filtersController.fieldChange);
  
  // const filtersSecond = createAppend(this._filtersElem, 'div', 'filters__block');
  // createAppend(filtersSecond, 'div', 'filters__header', 'Фильтры по диапазону');
  // this.rangeCount = new RangeCount(filtersSecond, this.filtersController.fieldChange);
  // this.rangeYear = new RangeYear(filtersSecond, this.filtersController.fieldChange);

  // const filtersThird = createAppend(this._filtersElem, 'div', 'filters__block');
  // createAppend(filtersThird, 'div', 'filters__header', 'Поиск');
  // this.search = new Search(filtersThird, this.filtersController.fieldChange);
  // createAppend(filtersThird, 'div', 'filters__header', 'Сортировка');
  // this.sort = new Sort(filtersThird, this.filtersController.fieldChange);
  // const resetFiltersBtn = createAppend(filtersThird, 'button', 'filter__reset-filters', 'Сброс фильтров');
  // resetFiltersBtn.onclick = () => {
  //   this.filtersController.resetFilters();
  // };
  // const resetSettingsBtn = createAppend(filtersThird, 'button', 'filter__reset-settings', 'Сброс настроек');
  // resetSettingsBtn.onclick = () => {
  //   this.filtersController.resetSettings();
  // };
  
  // this.sort.state = 'sortAZ';

  return (
    <div className={styles.filters}>
      <div className={styles.filters__block}>
      </div>
      <div className={styles.filters__block}>
      </div>
      <div className={styles.filters__block}>
      </div>

    </div>
  );
};

export default Filters;
