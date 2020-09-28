require("dotenv").config();

module.exports = {
    env: {
        API_URL: process.env.API_URL,
        MAPS_API_KEY: process.env.MAPS_API_KEY,
        EMAILJS_TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID,
        EMAILJS_USER_ID: process.env.EMAILJS_USER_ID
    },
  }