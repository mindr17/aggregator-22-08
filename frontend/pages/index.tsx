import { useEffect, useRef, useState } from 'react';
import { socketInterface } from '../src/modules/interfaces';
import { MySocket } from '../src/modules/MySocket';
import styles from  '../src/styles/Home.module.scss';
import Image from 'next/image';

function Home (props: any) {
  // const [messages, setMessages] = useState(['Template message']);

  // useEffect(() => {
  //   const chatSocket: socketInterface = new MySocket();

  //   const handleNewsEvent = (event: any) => {
  //     setMessages(lastState => {
  //       return [event.detail.msg, ...lastState];
  //     });
  //   };

  //   window.addEventListener('news', handleNewsEvent);

  //   return (
  //     () => {
  //       chatSocket.destroy();
        
  //       window.removeEventListener('news', handleNewsEvent);
  //     }
  //   );
  // }, []);

  return (
    <>
      <div>
        <div className={styles.hello}>Hello</div>
        <Image src={'/img/rs_school_js.svg'} layout='responsive' width='10' height='10' />
        {/* {
          messages.map(message => {
            return <div key={message}>{message}</div>;
          })
        } */}
      </div>
    </>
  );
};

export default Home;
