const configTemplate = {
  "baseConfig": {
    port: 3030,
  },
  "devConfig": {
    url: 'ws://localhost:3030/',
  },
  "prodConfig": {
    url: 'wss://bananasite.ru/api/aggregator',
  },
};

const configType = (process.env.NODE_ENV === 'development')
  ? 'devConfig'
  : 'prodConfig';

export const config = {
  ...configTemplate['baseConfig'],
  ...configTemplate[configType],
};

console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);
console.log('config: ', config);
