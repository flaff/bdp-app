import {actionCreator} from './helpers';

export const setUserName = actionCreator<string>('SET_USER_NAME');
export const setUserAvatar = actionCreator<string>('SET_USER_AVATAR');
