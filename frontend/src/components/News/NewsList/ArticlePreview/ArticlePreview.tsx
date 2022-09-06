import Link from 'next/link';
import styles from './ArticlePreview.module.scss';

const ArticlePreview = (props: any) => {
  const { message } = props;
  const currentDate = new Date();
  const currentUnix = currentDate.getTime();
  const messageDateUnix = new Date(message.date).getTime();
  const displayDateUnix = currentUnix - messageDateUnix;
  const displayDate = new Date(displayDateUnix);

  const renderDate = () => {
    if (displayDateUnix > 60 * 1000) {
      return (
        <div className={styles.date}>
          <div>
            {displayDate.getHours()}h
          </div>
          <div>
            {displayDate.getMinutes()}m
          </div>
        </div>
      )
    }

    return (
      <div className={styles.date}>
        <div>
          {displayDate.getMinutes()}m
        </div>
        <div>
          {displayDate.getSeconds()}s
        </div>
      </div>
    )
  };

  console.log(message);

  return (
    <Link href={'/'}>
      <a>
        <div className={styles.article}>
          {renderDate()}
          <div className={styles.ticker}>
            {message.ticker}
          </div>
          <div className={styles.title}>
            {message.title}
          </div>
        </div>
      </a>
    </Link>
  );
}

export default ArticlePreview;
