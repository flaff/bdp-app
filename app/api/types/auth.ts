import {User} from '@api/types/user';

export type AuthLoginParams = {
    name: string;
    password: string;
};

export type AuthLoginResponse = User & {
    token: string;
};

export type AuthRestoreParams = {
    token: string;
};

export type AuthRestoreResponse = User;

export type AuthRegisterParams = {
    name: string;
    password: string;
};

export type AuthRegisterResponse = {
    message: string;
};
