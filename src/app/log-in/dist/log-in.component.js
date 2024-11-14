"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LogInComponent = void 0;
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var app_1 = require("firebase/app");
var LogInComponent = /** @class */ (function () {
    function LogInComponent(afAuth) {
        this.afAuth = afAuth;
        this.loginData = {
            name: '',
            email: '',
            message: ''
        };
    }
    LogInComponent.prototype.onSubmit = function (ngForm) {
    };
    LogInComponent.prototype.googleSignIn = function () {
        return this.afAuth.signInWithPopup(new app_1["default"].auth.GoogleAuthProvider());
    };
    LogInComponent = __decorate([
        core_1.Component({
            selector: 'app-log-in',
            standalone: true,
            imports: [forms_1.FormsModule, common_1.CommonModule,],
            templateUrl: './log-in.component.html',
            styleUrl: './log-in.component.scss'
        })
    ], LogInComponent);
    return LogInComponent;
}());
exports.LogInComponent = LogInComponent;
