import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import admin from 'firebase-admin';
import config from './config';

const auth = () => {
    let auth: undefined | ReturnType<typeof initializeAuth>;

    const initializeAuth = () =>
        getAuth(
            admin.apps[0] ??
                initializeApp({
                    credential: admin.credential.cert(config),
                })
        );

    if (!auth) {
        auth = initializeAuth();
    }

    return auth;
};

export default auth;
