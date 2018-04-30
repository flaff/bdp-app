import axios from 'axios';
import Mappings from './mappings';

const
    vcsServices = axios.create({
        baseURL: 'http://localhost:6617'
    }),

    passData = (response) => response.data,

    GETUserHighlight = (userName: string) => vcsServices.get(Mappings.USER_HIGHLIGHT_URL({userName})).then(passData);

export {
    GETUserHighlight
};
