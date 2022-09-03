import { useEffect, useRef, useState } from 'react';
import { socketInterface } from '../../src/modules/interfaces';
import { MySocket } from '../../src/modules/MySocket';

function Home(props: any) {
  const [messagesState, setMessagesState] = useState([{ uid: 'osifdnaof' }]);

  useEffect(() => {
    const chatSocket: socketInterface = new MySocket();

    const handleNewsEvent = (event: any) => {
      setMessagesState((lastState) => {
        const msg = event.detail.msg;
        msg.uid = new Date().toString();
        console.log('msg: ', msg);

        console.log('messages: ', messagesState);

        return [msg, ...lastState];
      });
    };

    window.addEventListener('news', handleNewsEvent);

    return () => {
      chatSocket.destroy();

      window.removeEventListener('news', handleNewsEvent);
    };
  }, []);

  return (
    <>
      <div>
        {messagesState.map((message: any) => {
          return <div key={message.uid}>{JSON.stringify(message)}</div>;
        })}
      </div>
    </>
  );
}

export default Home;
