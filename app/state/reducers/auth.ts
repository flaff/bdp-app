import {AuthState} from '@state/types';
import {IAction, AUTH_LOGIN, AUTH_LOGOUT} from '@state/actions';
import Auth from '../../containers/Auth';

const
    setToken = (token: string) => {
        token ? localStorage.setItem("token", token) : localStorage.removeItem("token");
        return token || "";
    },

    getToken = () => localStorage.getItem("token") || "",

    defaultAuthState: AuthState = {
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

    authLogoutReducer = (state: AuthState, action: ReturnType<typeof AUTH_LOGOUT>): AuthState => ({
        ...state,
        token: setToken(''),
        name: '',
        avatar: '',
        authorized: false
    });

export default function authReducer(state: AuthState, action: IAction) {
    switch (action.type) {
        case AUTH_LOGIN.SUCCESS.type:
            return authLoginSuccessReducer(state, action);

        case AUTH_LOGOUT.type:
            return authLogoutReducer(state, action);


        default:
            return state || defaultAuthState;
    }
}