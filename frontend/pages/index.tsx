import { useEffect, useRef, useState } from 'react';
import { socketInterface } from '../src/modules/interfaces';
import { MySocket } from '../src/modules/MySocket';

function Home (props: any) {
  const [messages, setMessages] = useState(['Template message']);

  useEffect(() => {
    const chatSocket: socketInterface = new MySocket();

    const handleNewsEvent = (event: any) => {
      setMessages(lastState => {
        return [event.detail.msg, ...lastState];
      });
    };

    window.addEventListener('news', handleNewsEvent);

    return (
      () => {
        chatSocket.destroy();
        
        window.removeEventListener('news', handleNewsEvent);
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
