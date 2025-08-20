const config = require('../config/config');

const getBaseUrls = () => ({
  adminPanel: config.adminPanelUrl,
  careerPage: config.careerPageUrl,
  apiBase: config.apiBaseUrl
});

const getFullUrl = (endpoint, baseUrlType = 'apiBase') => {
  const urls = getBaseUrls();
  const baseUrl = urls[baseUrlType] || urls.apiBase;
  return `${baseUrl}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
};

module.exports = {
  getBaseUrls,
  getFullUrl
};
