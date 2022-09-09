const alwaysUseProd = true;

const configTemplate = {
  "baseConfig": {
    port: 3030,
  },
  "devConfig": {
    authUrl: 'http://localhost:5000/',
    fetchUrl: 'http://localhost:3031/',
    wsUrl: 'ws://localhost:3030/',
  },
  "prodConfig": {
    authUrl: 'https://bananasite.ru/api/aggregator/auth',
    fetchUrl: 'https://bananasite.ru/api/aggregator/fetch/test',
    wsUrl: 'wss://bananasite.ru/api/aggregator/ws',
  },
};

const getConfigType = () => {
  if (alwaysUseProd) return 'prodConfig';

  return (process.env.NODE_ENV === 'development')
    ? 'devConfig'
    : 'prodConfig';
};

const configType = getConfigType();

export const config = {
  ...configTemplate['baseConfig'],
  ...configTemplate[configType],
};

// console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);
// console.log('config: ', config);
