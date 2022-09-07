import styles from './Article.module.scss';

const Article = (props: any) => {
  const { message } = props;

  return (
    <>
      <div className={styles.text}>
        <div>
          {message.ticker}
        </div>
        <div className={styles.title}>
          {message.title}
        </div>
        <div className={styles.text}>
          {message.text}
        </div>
      </div>
    </>
  );
}

export default Article;
