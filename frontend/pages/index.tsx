import { useEffect, useRef, useState } from 'react';
import styles from '../src/styles/Home.module.scss'

function Home (props: any) {
  const [messages, setMessages] = useState(['Template message']);

  return (
    <>
      <div>
        <div className={styles.hello}>
          Hello world!
        </div>
      </div>
    </>
  );
};

export default Home;
