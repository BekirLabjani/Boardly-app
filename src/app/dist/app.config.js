"use strict";
exports.__esModule = true;
exports.appConfig = void 0;
var router_1 = require("@angular/router");
var app_routes_1 = require("./app.routes");
var app_1 = require("@angular/fire/app");
var auth_1 = require("@angular/fire/auth");
var firestore_1 = require("@angular/fire/firestore");
var firebaseConfig = {
    apiKey: "AIzaSyAoF6XLZmdKiQyoNbpLInVm83WIXxE1f54",
    authDomain: "boardly-app.firebaseapp.com",
    projectId: "boardly-app",
    storageBucket: "boardly-app.firebasestorage.app",
    messagingSenderId: "1042347544311",
    appId: "1:1042347544311:web:a45189cb7ce0e503cdcdf2",
    measurementId: "G-7VEFLXQFYN"
};
exports.appConfig = {
    providers: [router_1.provideRouter(app_routes_1.routes), app_1.provideFirebaseApp(function () { return app_1.initializeApp({ "projectId": "boardly-app", "appId": "1:1042347544311:web:a45189cb7ce0e503cdcdf2", "storageBucket": "boardly-app.firebasestorage.app", "apiKey": "AIzaSyAoF6XLZmdKiQyoNbpLInVm83WIXxE1f54", "authDomain": "boardly-app.firebaseapp.com", "messagingSenderId": "1042347544311", "measurementId": "G-7VEFLXQFYN" }); }), auth_1.provideAuth(function () { return auth_1.getAuth(); }), firestore_1.provideFirestore(function () { return firestore_1.getFirestore(); })]
};
