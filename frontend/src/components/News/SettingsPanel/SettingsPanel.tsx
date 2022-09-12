import { useState } from 'react';
import FiltersMenu from './FiltersMenu/FiltersMenu';
import styles from './SettingsPanel.module.scss';

const SettingsPanel = (props: any) => {
  const [burgerState, setBurgerState] = useState<boolean>(false);

  const onFiltersMenuToggle = () => {
    setBurgerState(!burgerState);
  };

  const addFiltersMenu = () => {
    if (burgerState) {
      return <FiltersMenu onClose={() => {setBurgerState(false)}} />
    }
  };
  
  return (
    <>
      {/* { addSortMenu } */}
      { addFiltersMenu() }
      <div className={styles.settingsPanel}>
        <div className={styles.settingsLeft}>
          {/* <div className={styles.sortBtn}>
          </div> */}
        </div>
        <div className={styles.settingsCenter}>

        </div>
        <div className={styles.settingsRight}>
          <div onClick={onFiltersMenuToggle} className={styles.filtersBtn}>
            Filters
          </div>
        </div>
      </div>
    </>
  );
}

export default SettingsPanel;
