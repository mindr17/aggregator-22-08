import { NextPage } from 'next';
import { useContext, useEffect, useState } from 'react';
import { config } from '../../src/config';
import { socketInterface } from '../../src/modules/interfaces';
import { MySocket } from '../../src/modules/MySocket';
import SettingsPanel from '../../src/components/News/SettingsPanel/SettingsPanel';
import NewsList from '../../src/components/News/NewsList/NewsList';
import { SWRConfig } from 'swr';
import { useRouter } from "next/router";
import AuthContext from '../../src/context/AuthContext';
import { authType } from '../../../types/sharedTypes';
import AddNewsComponent from '../../src/components/AddNewsComponent/AddNewsComponent';

const fetchData = async (fetchProps: any) => {
  const auth: authType = {
    // email: 'admin@gmail.com',
    email: 'admin@gmail.com',
    password: 'admin123',
    userId: '631f39402d253cdec485a876',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  };

  const requestBody = {
    type: 'news',
    settings: fetchProps.settings,
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

const NewsPage: NextPage = (props: any) => {
  const auth = useContext(AuthContext);
  const initialMessagesState = props.news;
  const [messagesState, setMessagesState] = useState(initialMessagesState);
  const router = useRouter();
  const [settingsState, setSettingsState] = useState({});
  // console.log('router.query: ', router.query);

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
      <AddNewsComponent />
    </>
  );
}

export default NewsPage;
