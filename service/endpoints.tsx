const BASE_DOMAIN = `https://api.cooldreamy.com/`;
const API_PATH = `${BASE_DOMAIN}api/`;

const endpoints = {
    register: `${API_PATH}api/register`,


    feeds: `${API_PATH}feeds`,
    setLike: `${API_PATH}feed/set_like`,
    setSkip: `${API_PATH}feed/set_skipe`
}

export default endpoints;