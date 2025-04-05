const apiConfig = {
  protocol: 'http',
  domain: 'localhost',
  port: '5253',
};

export const getApiUrl = () => {
  return `${apiConfig.protocol}://${apiConfig.domain}:${apiConfig.port}`;
};