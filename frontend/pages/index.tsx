import { useEffect, useRef, useState } from 'react';
import { socketInterface } from '../src/modules/interfaces';
import { MySocket } from '../src/modules/MySocket';

function Home (props: any) {
  const [messages, setMessages] = useState(['Template message']);

  useEffect(() => {
    const chatSocket: socketInterface = new MySocket();

    chatSocket.onMessage((event: { data: string; }) => {
      const newStr = event.data;
      const newObj = JSON.parse(newStr);
      setMessages(lastState => {
        return [newObj.msg, ...lastState];
      });
    });

    return (
      () => {
        chatSocket.destroy();
      }
    );
  }, []);

  return (
    <>
      <div>
        {
          messages.map(message => {
            return <div key={message}>{message}</div>;
          })
        }
      </div>
    </>
  );
};

export default Home;
