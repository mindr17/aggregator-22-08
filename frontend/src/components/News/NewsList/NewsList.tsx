import ArticlePreview from './ArticlePreview/ArticlePreview';
import styles from './NewsList.module.scss';

const NewsList = (props: any) => {
  const { messagesState } = props;

  return (
    <div className={styles.newsTable}>
      {/* <div className={styles.newsListHeading}>

      </div> */}
      <ul className={styles.newsList}>
        {messagesState.map((message: any) => {
          return <ArticlePreview key={message.uid} message={message} />
        })}
      </ul>
    </div>
  );
}

export default NewsList;
