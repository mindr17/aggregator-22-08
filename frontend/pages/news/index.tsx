import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { config } from '../../src/config';
import { socketInterface } from '../../src/modules/interfaces';
import { MySocket } from '../../src/modules/MySocket';

const NewsPage: NextPage = (props: any) => {
  const [messagesState, setMessagesState] = useState([{ uid: 'test' }]);

  useEffect(() => {
    const fetchData = async (filters: any) => {
      const url: string = config.fetchUrl;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        // body: JSON.stringify(filters),
        body: JSON.stringify({ filters: 'some filters' }),
      });

      const news = await response.json();

      news.forEach((item: any) => {
        item.uid = Math.random();
      });

      return news;
    };

    fetchData({}).then((news) => {
      setMessagesState(news);
    });

    const chatSocket: socketInterface = new MySocket();

    const handleNewsEvent = (event: any) => {
      setMessagesState((lastState) => {
        const msg = event.detail.msg;
        msg.uid = Math.random() * 100000;

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

export default NewsPage;
