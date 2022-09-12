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

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    
    console.log('handleSubmit');
    
    // const await props.fetchData({});

    const msg = {
      id: new Date(),
      date: '2022-09-08T12:57:15.000Z',
      vendor: 'prime',
      ticker: 'ROSN',
      url: 'https://1prime.ru/industry_and_energy/20220908/838055637.html',
      title: `Test from search`,
      text: 'Металлургический завод на Сицилии остановился из-за дороговизны энергии',
    };
    props.onSetMessagesState([msg]);
  }

  return (
    <>
      { addFiltersMenu() }
      <div className={styles.searchPanel}>
        <form className={styles.searchBox} onSubmit={handleSubmit}>
          <input className={styles.searchField} placeholder="Search for...">
          </input>
        </form>
      </div>
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
