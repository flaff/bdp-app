export type AuthState = {
    registering: boolean;
    registerError?: string;

    restoring: boolean;
    restoreError?: string;

    authorized: boolean;
    token: string;
    name: string;
    avatar?: string;
};
