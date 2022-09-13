import { useEffect, useState } from 'react';
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

  const [searchState, setSearchState] = useState('');

  const handleSearchChange = (e: { target: { value: any; }; }) => {
    setSearchState(e.target.value);
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    
    props.update({
      search: searchState,
    });
  };

  const getInputValue = () => {
    if (!props.settingsState) return;
    if (!props.settingsState.search) return;

    return props.settingsState.search;
  };

  useEffect(() => {
    console.log('getInputValue(): ', getInputValue());
    const inputValue = getInputValue();
    
    if (!inputValue) return;

    setSearchState(getInputValue());
  }, [props.settingsState]);


  return (
    <>
      { addFiltersMenu() }
      <div className={styles.searchPanel}>
        <form className={styles.searchBox} onSubmit={handleSubmit}>
          <input
            className={styles.searchField}
            placeholder="Search in news titles..."
            onChange={handleSearchChange}
            value={searchState}
          >
          </input>
        </form>
      </div>

      {/* <div className={styles.settingsPanel}>
        <div className={styles.settingsLeft}>
          <div className={styles.sortBtn}>
            Sort
          </div>
        </div>
        <div className={styles.settingsCenter}>

        </div>
        <div className={styles.settingsRight}>
          <div onClick={onFiltersMenuToggle} className={styles.filtersBtn}>
            Filters
          </div>
        </div>
      </div> */}
      
    </>
  );
}

export default SettingsPanel;
