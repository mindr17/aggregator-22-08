import ArticlePreview from './ArticlePreview/ArticlePreview';
import styles from './NewsList.module.scss';

const NewsList = (props: any) => {
  const { messagesState } = props;

  const renderArticles = () => {
    if (messagesState.length === 0) {
      return (
        <div className={styles.empty}>Ничего не найдено</div>
      )
    }

    return (
      <ul className={styles.newsList}>
        {messagesState.map((message: any) => {
          return <ArticlePreview key={message.id} message={message} />
        })}
      </ul>
    );
  }

  return (
    <div className={styles.newsTable}>
      {/* <div className={styles.newsListHeading}>
      </div> */}
      {renderArticles()}
    </div>
  );
}

export default NewsList;
