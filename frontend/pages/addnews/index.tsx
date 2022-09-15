import { NextPage } from 'next';
import { config } from '../../src/config';
import { authType } from '../../../types/sharedTypes';
import AddNewsComponent from '../../src/components/AddNewsComponent/AddNewsComponent';

const fetchData = async (fetchProps: any) => {
  const auth: authType = {
    email: 'admin@gmail.com',
    password: 'admin123',
    userId: '631f39402d253cdec485a876',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  };

  const requestBody = {
    type: fetchProps.type,
    article: fetchProps.article,
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
  const update = async (fetchProps: any) => {
    fetchData(fetchProps);
  };

  return (
    <>
      <AddNewsComponent update={update} />
    </>
  );
}

export default NewsPage;
