import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { config } from '../../src/config';
import { socketInterface } from '../../src/modules/interfaces';
import { MySocket } from '../../src/modules/MySocket';
import Filters from '../../src/components/News/Filters/Filters';
import NewsList from '../../src/components/News/NewsList/NewsList';
import { SWRConfig } from 'swr';

const fetchData = async (settings: any) => {
  const requestBody = {
    type: 'news',
    settings,
  };

  const response = await fetch(config.fetchUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  return await response.json();
};

export async function getStaticProps() {
  const news = await fetchData({});
  
  return {
    props: {
      news,
      fallback: {
        'timeSincePostSave': '0',
      },
    },
  };
};

const NewsPage: NextPage = (props: any) => {
  const initialMessagesState = props.news;
  const [messagesState, setMessagesState] = useState(initialMessagesState);


  return (
    <>
      <Filters />
      {/* <NewsList messagesState={messagesState} /> */}
      <SWRConfig value={ props.fallback }>
        <NewsList messagesState={props.news} />
      </SWRConfig>
    </>
  );
}

export default NewsPage;

// useEffect(() => {
  // fetchData({}).then((news) => {
  //   setMessagesState(news);
  // });

    // const chatSocket: socketInterface = new MySocket();

    // const handleNewsEvent = (event: any) => {
    //   setMessagesState((lastState: any) => {
    //     const msg = event.detail.msg;
    //     msg.uid = Math.random() * 100000;

    //     return [msg, ...lastState];
    //   });
    // };

    // window.addEventListener('news', handleNewsEvent);

    // return () => {
    //   chatSocket.destroy();

    //   window.removeEventListener('news', handleNewsEvent);
    // };
  // }, []);
