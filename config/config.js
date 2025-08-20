const config = {
  development: {
    apiBaseUrl: 'http://localhost:5001/api',
    adminPanelUrl: 'http://localhost:3000/admin',
    careerPageUrl: 'http://localhost:3000/careers'
  },
  production: {
    apiBaseUrl: 'https://api.urbanchanakya.com/api',
    adminPanelUrl: 'https://admin.urbanchanakya.com',
    careerPageUrl: 'https://urbanchanakya.com/careers'
  }
};

module.exports = config[process.env.NODE_ENV || 'development'];
