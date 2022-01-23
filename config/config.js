const dotenv = require('dotenv');

dotenv.config();

const {
    PORT,
    HOST,
    HOST_URL,
    LINKPRIVIEW_API_URL,
    LINKPRIVIEW_API_KEY
} = process.env;

module.exports = {
    port: PORT,
    host: HOST,
    url: HOST_URL,
    link_preview_api_url: LINKPRIVIEW_API_URL,
    link_preview_api_key: LINKPRIVIEW_API_KEY
}