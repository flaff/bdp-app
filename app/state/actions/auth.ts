import {createAction, createRequestActions} from './helpers';
import {AuthLoginParams, AuthLoginResponse, AuthRegisterResponse, AuthRestoreResponse} from '@api/types';
import {POSTAuthLogin} from '@api';

export const
    AUTH_LOGIN = createRequestActions<AuthLoginResponse>('AUTH_LOGIN'),
    AUTH_RESTORE = createRequestActions<AuthRestoreResponse>('AUTH_RESTORE'),
    AUTH_REGISTER = createRequestActions<AuthRegisterResponse>('AUTH_REGISTER'),
    AUTH_LOGOUT = createAction('AUTH_LOGOUT'),

    loginUser = (dispatch) => (params: AuthLoginParams) => {
        dispatch(AUTH_LOGIN.START());
        POSTAuthLogin.fetch(params)
            .then((data) => dispatch(AUTH_LOGIN.SUCCESS(data)))
            .catch((error) => dispatch(AUTH_LOGIN.ERROR(error)));
    };
