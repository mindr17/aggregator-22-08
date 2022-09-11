import Link from 'next/link';
import useSWR from 'swr';
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

  const { data } = useSWR('timeSincePostSave', renderDate)

  return (
    <Link href={`/news/${message.id}`}>
      <a>
        <div className={styles.article}>
          <div>{ data }</div>
          <div className={styles.ticker}>
            {message.ticker}
          </div>
          <p className={styles.title}>
            {message.title}
          </p>
        </div>
      </a>
    </Link>
  );
}

export default ArticlePreview;
