const cloudinary = require('cloudinary').v2;
cloudinary.config({ 
    cloud_name: 'lth', 
    api_key: '259892461732715', 
    api_secret: 'ALEA69LbsuBYsW8Ep5jVpYGEWQs' 
  });

  module.exports = {cloudinary};