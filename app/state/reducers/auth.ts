import {AuthState} from '@state/types';
import {IAction, AUTH_LOGIN, AUTH_LOGOUT, AUTH_RESTORE, AUTH_REGISTER} from '@state/actions';
import Auth from '../../containers/Auth/Auth';
import Fetcher from 'unfetcher';
import set = Reflect.set;

const
    setToken = (token: string) => {
        token ? localStorage.setItem("token", token) : localStorage.removeItem("token");
        Fetcher.headers = Fetcher.headers || {};
        Fetcher.headers['AUTH-TOKEN'] = token;
        return token || "";
    },

    getToken = () => localStorage.getItem("token") || "",

    defaultAuthState: AuthState = {
        restoring: false,
        registering: false,

        authorized: false,
        avatar: '',
        name: '',
        token: getToken()
    },

    authLoginSuccessReducer = (state: AuthState, action: ReturnType<typeof AUTH_LOGIN.SUCCESS>): AuthState => ({
        ...state,
        token: setToken(action.payload.token),
        name: action.payload.name,
        avatar: action.payload.avatar,
        authorized: true
    }),

    authRegisterSuccessReducer = (state: AuthState, action: ReturnType<typeof AUTH_REGISTER.SUCCESS>): AuthState => ({
        ...state,
        registering: false
    }),

    authLogoutReducer = (state: AuthState, action: ReturnType<typeof AUTH_LOGOUT>): AuthState => ({
        ...state,
        token: setToken(''),
        name: '',
        avatar: '',
        authorized: false
    }),

    authRestoreStartReducer = (state: AuthState, action: ReturnType<typeof AUTH_RESTORE.START>): AuthState => ({
        ...state,
        restoring: true
    }),

    authRestoreSuccessReducer = (state: AuthState, action: ReturnType<typeof AUTH_RESTORE.SUCCESS>): AuthState => ({
        ...state,
        name: action.payload.name,
        avatar: action.payload.avatar,
        authorized: true,
        restoring: false
    }),

    authRestoreErrorReducer = (state: AuthState, action: ReturnType<typeof AUTH_RESTORE.SUCCESS>): AuthState => ({
        ...state,
        restoring: false
    });

Fetcher.headers = Fetcher.headers || {};
Fetcher.headers['AUTH-TOKEN'] = getToken();

export default function authReducer(state: AuthState, action: IAction<any>) {
    switch (action.type) {
        case AUTH_RESTORE.START.type:
            return authRestoreStartReducer(state, action);

        case AUTH_RESTORE.SUCCESS.type:
            return authRestoreSuccessReducer(state, action);

        case AUTH_RESTORE.ERROR.type:
            return authRestoreErrorReducer(state, action);

        case AUTH_LOGIN.SUCCESS.type:
            return authLoginSuccessReducer(state, action);

        case AUTH_LOGOUT.type:
            return authLogoutReducer(state, action);


        default:
            return state || defaultAuthState;
    }
}