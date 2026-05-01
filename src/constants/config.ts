const ENV = {
  dev: {
    API_URL: 'https://pokeapi.co/api/v2',
  },
  prod: {
    API_URL: 'https://pokeapi.co/api/v2',
  },
};

const getEnvVars = () => {
  if (__DEV__) return ENV.dev;
  return ENV.prod;
};

export default getEnvVars();