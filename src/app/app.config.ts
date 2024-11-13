import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"boardly-app","appId":"1:1042347544311:web:a45189cb7ce0e503cdcdf2","storageBucket":"boardly-app.firebasestorage.app","apiKey":"AIzaSyAoF6XLZmdKiQyoNbpLInVm83WIXxE1f54","authDomain":"boardly-app.firebaseapp.com","messagingSenderId":"1042347544311","measurementId":"G-7VEFLXQFYN"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
