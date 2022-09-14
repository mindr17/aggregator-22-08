import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { config } from '../../src/config';
import { socketInterface } from '../../src/modules/interfaces';
import { MySocket } from '../../src/modules/MySocket';
import SettingsPanel from '../../src/components/News/SettingsPanel/SettingsPanel';
import NewsList from '../../src/components/News/NewsList/NewsList';
import { SWRConfig } from 'swr';
import { useRouter } from "next/router";

const fetchData = async (settings: any) => {
  const auth = {
    email: 'admin@gmail.com',
    password: 'admin1234',
    userId: '631f39402d253cdec485a876',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  };

  const requestBody = {
    type: 'news',
    settings,
    auth,
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
  const router = useRouter();
  const [settingsState, setSettingsState] = useState({});
  // console.log('router.query: ', router.query);
  
  const updateUri = () => {

  };
  
  const update = async (settings: any) => {
    // if (JSON.stringify(settings) === JSON.stringify(settingsState)) return;
    
    setSettingsState(settings);
    
    router.push({
      // pathname: '/post/[pid]',
      query: settings,
    });
    
    const newsData = await fetchData(settings);
    setMessagesState(newsData);
  };

  useEffect(()=>{
    if(!router.isReady) return;

    console.log('router.query: ', router.query);
    setSettingsState(router.query);
    console.log('settingsState: ', settingsState);
    
    fetchData(router.query).then((news) => {
      setMessagesState(news);
    });

  }, [router.isReady]);
  
  useEffect(() => {
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
      <SettingsPanel settingsState={settingsState} update={update}/>
      <SWRConfig value={ props.fallback }>
        <NewsList messagesState={messagesState} update={update}/>
      </SWRConfig>
    </>
  );
}

export default NewsPage;
