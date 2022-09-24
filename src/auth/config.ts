import { initializeApp } from 'firebase/app';
import { parseAsStringEnv } from 'esbuild-env-parsing';

const app = initializeApp({
    apiKey: parseAsStringEnv({
        env: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        name: 'FIREBASE_API_KEY',
    }),
    authDomain: parseAsStringEnv({
        env: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        name: 'FIREBASE_AUTH_DOMAIN',
    }),
    projectId: parseAsStringEnv({
        env: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        name: 'FIREBASE_PROJECT_ID',
    }),
    storageBucket: parseAsStringEnv({
        env: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        name: 'FIREBASE_STORAGE_BUCKET',
    }),
    messagingSenderId: parseAsStringEnv({
        env: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        name: 'FIREBASE_MESSAGING_SENDER_ID',
    }),
    appId: parseAsStringEnv({
        env: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        name: 'FIREBASE_APP_ID',
    }),
    measurementId: parseAsStringEnv({
        env: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
        name: 'FIREBASE_MEASUREMENT_ID',
    }),
});

export { app };
