import Fetcher from 'unfetcher';
import {AuthLoginParams, AuthLoginResponse, AuthRegisterParams, AuthRegisterResponse, AuthRestoreParams, AuthRestoreResponse} from '@api/types';
import Mappings from '@api/mappings';

export const
    POSTAuthLogin = new Fetcher<AuthLoginResponse, AuthLoginParams>({
        url: Mappings.AUTH_LOGIN_URL,
        method: 'POST'
    }),

    POSTAuthRegister = new Fetcher<AuthRegisterResponse, AuthRegisterParams>({
        url: Mappings.AUTH_REGISTER_URL,
        method: 'POST'
    }),

    POSTAuthRestore = new Fetcher<AuthRestoreResponse, AuthRestoreParams>({
        url: Mappings.AUTH_RESTORE_URL,
        method: 'POST'
    });


