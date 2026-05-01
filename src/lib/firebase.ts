import { initializeApp } from "firebase/app";
import type { FirebaseApp } from "firebase/app";
import {
    initializeFirestore,
    persistentLocalCache,
    persistentMultipleTabManager
} from 'firebase/firestore';
import type { Firestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import type { Auth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import type { FirebaseStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';
import type { Functions } from 'firebase/functions';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const hasFirebaseConfig = Boolean(
    firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId &&
    firebaseConfig.storageBucket &&
    firebaseConfig.messagingSenderId &&
    firebaseConfig.appId &&
    firebaseConfig.measurementId
);

const isBrowser = typeof window !== 'undefined';

let app!: FirebaseApp;
let db!: Firestore;
let auth!: Auth;
let storage!: FirebaseStorage;
let functions!: Functions;

if (isBrowser && hasFirebaseConfig) {
    app = initializeApp(firebaseConfig);

    db = initializeFirestore(app, {
        localCache: persistentLocalCache({
            tabManager: persistentMultipleTabManager()
        })
    });

    auth = getAuth(app);
    storage = getStorage(app);
    functions = getFunctions(app);
} else {
    if (!isBrowser) {
        console.warn('[Firebase] Initialization skipped on server-side.');
    } else if (!hasFirebaseConfig) {
        console.warn('[Firebase] Missing Firebase environment variables; initialization skipped.');
    }
}

export { db, auth, storage, functions, app, hasFirebaseConfig };

// Simple online/offline logging (optional, silent on success)
if (typeof window !== 'undefined') {
    window.addEventListener('offline', () => {
        console.warn("%c[Firebase] Network connectivity lost. Switching to offline mode.", "color: #ff9800; font-weight: bold;");
    });
    window.addEventListener('online', () => {
        console.info("%c[Firebase] Network connectivity restored.", "color: #4caf50; font-weight: bold;");
    });
}
