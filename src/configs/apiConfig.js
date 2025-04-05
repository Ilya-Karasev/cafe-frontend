const apiConfig = {
  protocol: 'https',
  domain: 'caffe-production.up.railway.app',
};

export const getApiUrl = () => {
  return `${apiConfig.protocol}://${apiConfig.domain}`;
};
