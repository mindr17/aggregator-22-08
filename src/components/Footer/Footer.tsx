import styles from './Footer.module.scss';
import cls from 'classnames';
import Image from 'next/image';

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.footer__details}>
      <a className={styles.footer__github} href="https://github.com/mindr17">
        <Image layout="fill" src="/img/github.png" alt="github" />
      </a>
      2022
      <a className={styles.footer__rs} href="https://rs.school/js/">
        <Image layout="fill" src="/img/rs_school_js.svg" alt="alt" />
      </a>
    </div>
  </footer>
);

export default Footer;
