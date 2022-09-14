import { useState } from 'react';
import styles from './AddNewsComponent.module.scss';

const AddNewsComponent = (props: any) => {
  const [burgerState, setBurgerState] = useState<boolean>(false);

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

  return (
    <div className={styles.addNews}>
      <form className={styles.addNewsForm} onSubmit={handleSubmit}>
        <textarea
          className={styles.textArea}
          placeholder="Search in news titles..."
          onChange={handleSearchChange}
          value={searchState}
        >
        </textarea>
      </form>
    </div>
  );
}

export default AddNewsComponent;
