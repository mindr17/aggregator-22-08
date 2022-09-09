import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { config } from '../../src/config';
import { socketInterface } from '../../src/modules/interfaces';
import { MySocket } from '../../src/modules/MySocket';
import Filters from '../../src/components/News/Filters/Filters';
import NewsList from '../../src/components/News/NewsList/NewsList';

const NewsPage: NextPage = (props: any) => {
  const [messagesState, setMessagesState] = useState([{ id: 0 }]);

  const fetchData = async (settings: any) => {
    const url: string = config.fetchUrl;
    
    const request = {
      type: 'news',
      settings: settings,
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    const news = await response.json();

    return news;
  };

  useEffect(() => {
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

export default NewsPage;
