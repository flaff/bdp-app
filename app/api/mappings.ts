import {UserHighlightPayload} from '@api/payloads';

const
    BASE_URL = 'http://localhost:6617',

    Mappings = {
        LIST_REPOSITORIES_URL: 'repositories',
        LIST_MODELS_URL: 'models',
        LIST_VIEWS_URL: 'views',
        LIST_PROJECTS_URL: 'projects',
        USER_HIGHLIGHT_URL: (payload: UserHighlightPayload) => `user/${payload.userName}/highlight`,
        AUTH_LOGIN_URL: 'auth/login',
        AUTH_REGISTER_URL: 'auth/register',
        AUTH_RESTORE_URL: 'auth/restore'
    },

    addBaseURL = (mappings, baseURL: string) => {
        Object.keys(mappings).forEach((name) => {
            const mapping = mappings[name];
            mappings[name] = typeof mapping === 'function'
                ? (p) => `${baseURL}/${mapping(p)}`
                : `${baseURL}/${mapping}`;
        });
    };

addBaseURL(Mappings, BASE_URL);

export default Mappings;
