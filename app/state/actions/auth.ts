import {createAction, createRequestActions} from './helpers';
import {
    AuthLoginParams,
    AuthLoginResponse, AuthRegisterParams,
    AuthRegisterResponse,
    AuthRestoreParams,
    AuthRestoreResponse
} from '@api/types';
import {POSTAuthLogin, POSTAuthRegister, POSTAuthRestore} from '@api';

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
    },

    restoreUser = (dispatch) => (params: AuthRestoreParams) => {
        dispatch(AUTH_RESTORE.START());
        POSTAuthRestore.fetch(params)
            .then((data) => dispatch(AUTH_RESTORE.SUCCESS(data)))
            .catch((error) => setTimeout(() => dispatch(AUTH_RESTORE.ERROR(error)), 1000));
    },

    registerUser = (dispatch) => (params: AuthRegisterParams) => {
        dispatch(AUTH_REGISTER.START());
        POSTAuthRegister.fetch(params)
            .then((data) => dispatch(AUTH_REGISTER.SUCCESS(data)))
            .catch((error) => dispatch(AUTH_REGISTER.ERROR(error)));
    },

    logoutUser = (dispatch) => () => dispatch(AUTH_LOGOUT());
