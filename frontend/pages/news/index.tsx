import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { config } from '../../src/config';
import { socketInterface } from '../../src/modules/interfaces';
import { MySocket } from '../../src/modules/MySocket';
import SettingsPanel from '../../src/components/News/SettingsPanel/SettingsPanel';
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
  const [settingsState, setSettingsState] = useState({});

  const updateUri = () => {

  };

  // const update = async (settings: any) => {
  //   const res = await fetchData({});
  //   const newsData = await res.json();
  //   setMessagesState(newsData);
  // };

  useEffect(() => {
    // settingsState = 

    // fetchData({}).then((news) => {
    //   setMessagesState(news);
    // });

    const chatSocket: socketInterface = new MySocket();

    const handleNewsEvent = (event: any) => {
      setMessagesState((lastState: any) => {
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
      <SettingsPanel onSetMessagesState={setMessagesState}/>
      <SWRConfig value={ props.fallback }>
        {/* <NewsList messagesState={messagesState} update={update}/> */}
        <NewsList messagesState={messagesState} />
      </SWRConfig>
    </>
  );
}

export default NewsPage;
