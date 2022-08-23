import styles from './Footer.module.scss';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <ul className={styles.studentsList}>
          <li>
            <a href='https://github.com/mindr17'>@mindr17</a>
          </li>
          <li>
            <a href='https://github.com/Maslovars'>@Maslovars</a>
          </li>
          <li>
            <a href='https://github.com/Vladi4-gh'>@Vladi4-gh</a>
          </li>
        </ul>
        <p className={styles.year}>2022</p>
        <a href='https://rs.school/js/'>
          <Image src='/img/rs_school_js.svg' width={110} height={60} alt='rss logo' />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
