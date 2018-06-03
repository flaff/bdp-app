import Fetcher from 'unfetcher';
import {AuthLoginParams, AuthLoginResponse, AuthRegisterParams, AuthRegisterResponse} from '@api/types';
import Mappings from '@api/mappings';

export const
    POSTAuthLogin = new Fetcher<AuthLoginResponse, AuthLoginParams>({
        url: Mappings.AUTH_LOGIN_URL,
        method: 'POST'
    }),

    POSTAuthRegister = new Fetcher<AuthRegisterResponse, AuthRegisterParams>({
        url: Mappings.AUTH_LOGIN_URL,
        method: 'POST'
    });


