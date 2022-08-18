const configTemplate = {
  "baseConfig": {
    url: 'ws://localhost:3030/',
    port: 3030,
  },
  "devConfig": {
  },
  "prodConfig": {
  },
};

const configType = (process.env.NODE_ENV !== 'development')
  ? 'devConfig'
  : 'prodConfig';

export const config = {
  ...configTemplate['baseConfig'],
  ...configTemplate[configType],
};
