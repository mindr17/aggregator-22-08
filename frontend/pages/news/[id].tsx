import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { config } from '../../src/config';
import { socketInterface } from '../../src/modules/interfaces';
import { MySocket } from '../../src/modules/MySocket';
import Filters from '../../src/components/News/SettingsPanel/SettingsPanel';
import NewsList from '../../src/components/News/NewsList/NewsList';
import Article from '../../src/components/News/Article/Article';
import { useRouter } from 'next/router';

const ArticlePage: NextPage = (props: any) => {
  const [articleState, setArticleState] = useState({});

  const initialPrices = {
    ticker: '',
    candles: [],
  };

  const [pricesState, setPricesState] = useState({});
  const router = useRouter();
  
  const fetchData = async (filters: any) => {
    const url: string = config.fetchUrl;
    
    const request = {
      type: 'article',
      settings: {
        id: Number(router.query.id),
      },
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
    if (router.asPath !== router.route) {
      fetchData({}).then((news) => {
        setArticleState(news);
      });
    };

      const chatSocket: socketInterface = new MySocket();

      const handleNewsEvent = (event: any) => {
        setArticleState((lastState: any) => {
          const msg = event.detail.msg;
          msg.uid = Math.random() * 100000;

          return [msg, ...lastState];
        });
      };

      // window.addEventListener('news', handleNewsEvent);

    return () => {
      chatSocket.destroy();

      // window.removeEventListener('news', handleNewsEvent);
    };
  }, [router]);

  return (
    <Article message={articleState} />
  );
}

export default ArticlePage;
