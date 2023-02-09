import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, User } from 'firebase/auth';
import adonixAxios from '../../axios';
import { api } from '../../util/const';
import config from './config';

export default class AdonixAuthAdmin {
    private readonly auth: ReturnType<typeof getAuth>;

    private static authAdmin: undefined | AdonixAuthAdmin = undefined;

    static readonly instance = () => {
        const { authAdmin } = this;
        switch (typeof authAdmin) {
            case 'undefined': {
                this.authAdmin = new this();
                return this.authAdmin;
            }
        }
        return authAdmin;
    };

    private constructor() {
        initializeApp(config);
        this.auth = this.initialiseAuth();
    }

    private readonly initialiseAuth = () => {
        const auth = getAuth();
        auth.languageCode = 'it';
        return auth;
    };

    readonly getAuth = () => this.auth;

    readonly signIn = async ({
        email,
        password,
    }: Readonly<{
        email: string;
        password: string;
    }>) => {
        try {
            const userCredential = await signInWithEmailAndPassword(
                this.auth,
                email,
                password
            );
            await adonixAxios.post(api.admin.login, {
                data: {
                    token: await userCredential.user.getIdToken(true),
                },
            });
            return {
                type: 'succeed',
                name: userCredential.user.displayName,
            } as const;
        } catch (error) {
            return {
                type: 'failed',
                error,
            } as const;
        }
    };

    readonly signOut = async (admin: NonNullableAdonixAdmin) => {
        try {
            await adonixAxios.post(api.admin.logout, {
                data: {
                    token: await admin.getIdToken(true),
                },
            });
            await this.auth.signOut();
            return {
                type: 'succeed',
            } as const;
        } catch (error) {
            return {
                type: 'failed',
                error,
            } as const;
        }
    };
}

type AdonixAdmin = User | undefined;

type NonNullableAdonixAdmin = NonNullable<AdonixAdmin>;

export type { AdonixAdmin, NonNullableAdonixAdmin };
