import Image from 'next/image';
import styles from './Info.module.scss';

const Info: React.FC = () => {
  return (
    <div className={styles.info}>
      <h2 className={styles.title}>Our team</h2>
      <div className={styles.student}>
        {/* <div className={styles.imageWrapper}>
          <Image src='/img/abstract-user-flat-4.svg' width={150} height={150} alt='photo' />
        </div> */}
        <div className={styles.studentsInfo}>
          <h3 className={styles.studentTitle}>Andrey Ivanov</h3>
          <p className={styles.description}>Team Lead, Front-end (Typescript, React, Next) Backend (Typescript, Nodejs, Websocket, Mongodb)</p>
        </div>
      </div>
      <div className={styles.student}>
        {/* <div className={styles.imageWrapper}>
          <Image src='/img/Arseny.png' width={150} height={150} alt='photo' />
        </div> */}
        <div className={styles.studentsInfo}>
          <h3 className={styles.studentTitle}>Arseny Maslov</h3>
          <p className={styles.description}>Front-end (Typescript, React, Next, Redux), Backend (Typescript, Nodejs, Mongodb)</p>
        </div>
      </div>
      <div className={styles.student}>
        {/* <div className={styles.imageWrapper}>
          <Image src='/img/Vlad.jpeg' width={150} height={150} alt='photo' />
        </div> */}
        <div className={styles.studentsInfo}>
          <h3 className={styles.studentTitle}>Vladislav Ivanov</h3>
          <p className={styles.description}>Front-end (Typescript, React, Next, Redux), Backend (Typescript, Nodejs, ASP.net, SQL)</p>
        </div>
      </div>
    </div>
  )
};

export default Info;
