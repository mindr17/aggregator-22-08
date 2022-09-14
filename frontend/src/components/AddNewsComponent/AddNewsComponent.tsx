import { useState } from 'react';
import styles from './AddNewsComponent.module.scss';

const AddNewsComponent = (props: any) => {
  const [timeState, setTimeState] = useState('');
  const [titleState, setTitleState] = useState('');
  const [textState, setTextState] = useState('');
  const [form, setForm] = useState({
    
  });

  const handleSearchChange = (e: { target: { value: any; }; }) => {
    setTimeState(e.target.value);
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    
    const article = {
      time: timeState,
      title: titleState,
      text: textState,
    }

    console.log(article);

    // props.update({
    //   article,
    // });
  };

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.addNews}>
      <form className={styles.addNewsForm} onSubmit={handleSubmit}>
        <div className={styles.block}>
          Time
          <textarea
            className={styles.textArea}
            placeholder="Input news time"
            onChange={handleSearchChange}
            value={timeState}
          >
          </textarea>
        </div>
        <div className={styles.block}>
          Title
          <textarea
            className={styles.textArea}
            placeholder="Input news title"
            onChange={handleSearchChange}
            value={titleState}
          >
          </textarea>
        </div>
        <div className={styles.block}>
          Text
          <textarea
            className={styles.textArea}
            placeholder="Input news text"
            onChange={handleSearchChange}
            value={textState}
          >
          </textarea>
        </div>
        <button className={styles.addArticleBtn}>Add article</button>
      </form>
    </div>
  );
}

export default AddNewsComponent;
