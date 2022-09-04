const configTemplate = {
  "baseConfig": {
    port: 3030,
  },
  "devConfig": {
    fetchUrl: 'http://localhost:3031/',
    wsUrl: 'ws://localhost:3030/',
  },
  "prodConfig": {
    fetchUrl: 'https://bananasite.ru/api/aggregator/fetch',
    wsUrl: 'wss://bananasite.ru/api/aggregator/ws',
  },
};

const configType = (process.env.NODE_ENV === 'development')
  ? 'devConfig'
  : 'prodConfig';

export const config = {
  ...configTemplate['baseConfig'],
  ...configTemplate[configType],
};

// console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);
// console.log('config: ', config);
