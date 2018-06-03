import axios from 'axios';
import 'unfetch';
import Fetcher from 'unfetcher';
import Mappings from './mappings';
import {UserHighlightPayload} from './payloads';
import {UserHighlightResponse} from './responses';
export * from './auth';

Fetcher.headers = {
    'Content-Type': 'application/json'
};

Fetcher.transform = JSON.stringify;

const
    BASE_URL = 'http://localhost:6617',

    vcsServices = axios.create({
        baseURL: 'http://localhost:6617'
    }),

    passData = (response) => response.data,

    GETUserHighlight = new Fetcher<UserHighlightResponse, UserHighlightPayload>({
        url: params => Mappings.USER_HIGHLIGHT_URL(params)
    });

export {
    GETUserHighlight as GETUserHighlight
};
