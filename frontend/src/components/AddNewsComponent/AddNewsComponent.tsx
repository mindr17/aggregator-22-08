import { useState } from 'react';
import styles from './AddNewsComponent.module.scss';

const AddNewsComponent = (props: any) => {
  const [formState, setFormState] = useState({
    time: new Date().toString(),
    title: 'Title of manually added news',
    text: 'Some manually added news text',
  });

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    
    const fetchProps = {
      type: 'addnews',
      article: formState,
    };

    console.log('fetchProps: ', fetchProps);
    
    props.update(fetchProps);
  };

  const handleFieldChange = (e: { target: { name: any; value: any; }; }) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.addNews}>
      <form className={styles.addNewsForm}>
        <div className={styles.block}>
          Time
          <textarea
            className={styles.textArea}
            name='time'
            placeholder="Input news time"
            onChange={handleFieldChange}
            value={formState.time}
          >
          </textarea>
        </div>
        <div className={styles.block}>
          Title
          <textarea
            className={styles.textArea}
            name='title'
            placeholder="Input news title"
            onChange={handleFieldChange}
            value={formState.title}
          >
          </textarea>
        </div>
        <div className={styles.block}>
          Text
          <textarea
            className={styles.textArea}
            name='text'
            placeholder="Input news text"
            value={formState.text}
            onChange={handleFieldChange}
          >
          </textarea>
        </div>
        <button 
          className={styles.addArticleBtn}
          onClick={handleSubmit}
        >
          Add article to database
        </button>
      </form>
    </div>
  );
}

export default AddNewsComponent;
