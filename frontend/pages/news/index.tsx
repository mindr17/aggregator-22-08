import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { config } from '../../src/config';
import { socketInterface } from '../../src/modules/interfaces';
import { MySocket } from '../../src/modules/MySocket';
import Filters from '../../src/components/News/Filters/Filters';
import NewsList from '../../src/components/News/NewsList/NewsList';

const Home: NextPage = (props: any) => {
  const [messagesState, setMessagesState] = useState([{ id: 0 }]);

  useEffect(() => {
    const fetchData = async (filters: any) => {
      const url: string = config.fetchUrl;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
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
      <Filters />
      <NewsList messagesState={messagesState} />
    </>
  );
}

export default Home;
