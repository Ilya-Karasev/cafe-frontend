const apiConfig = {
  protocol: 'http',
  domain: 'localhost',
  port: '5253',
};

export const getApiUrl = () => {
  return `${apiConfig.protocol}://${apiConfig.domain}:${apiConfig.port}`;
};

/* const apiConfig = {
  protocol: 'https',
  domain: 'caffe-production.up.railway.app',
};

export const getApiUrl = () => {
  return `${apiConfig.protocol}://${apiConfig.domain}`;
}; */
