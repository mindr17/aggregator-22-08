import { useEffect, useRef, useState } from 'react';
import { config } from '../../src/config';
import { socketInterface } from '../../src/modules/interfaces';
import { MySocket } from '../../src/modules/MySocket';

function Home (props: any) {
  const [messagesState, setMessagesState] = useState([{uid: 'osifdnaof'}]);

  useEffect(() => {
    const fetchData = async (filters: any) => {
      const url: string = config.fetchUrl;

      const response = await fetch(url,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain',
          },
          // body: JSON.stringify(filters),
          body: '',
        },
      );

      const news = await response.json();
      
      return news;
    };

    fetchData({}).then((news) => {
      // setMessagesState((oldState: any) => {
        //   return [...oldState, news];
        // });
      setMessagesState(news);
    });

    const chatSocket: socketInterface = new MySocket();

    const handleNewsEvent = (event: any) => {
      setMessagesState(lastState => {
        const msg = event.detail.msg;
        msg.uid = (Math.random() * 100000);

        return [msg, ...lastState];
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
          messagesState.map((message: any) => {
            return <div key={message.uid}>{JSON.stringify(message)}</div>;
          })
        }
      </div>
    </>
  );
};

export default Home;
