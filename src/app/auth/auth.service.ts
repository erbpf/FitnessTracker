import { User } from "./user.model";
import { AuthData } from "./auth-data.model";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import { TrainingService } from "../training/training.service";
import { MatSnackBar } from "@angular/material";
import { UIService } from "../shared/ui.service";

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    // private user: User;
    private isAuthenticated = false;

    constructor(
        private router: Router,
        private afauth: AngularFireAuth,
        private trainingService: TrainingService,
        private snackBar: MatSnackBar,
        private uiService: UIService) {

    }

    initAuthListener() {
        //emits whenever auth state changes
        this.afauth.authState.subscribe(user => {
            if (user) {
                //login
                this.isAuthenticated = true;
                this.authChange.next(true);
                this.router.navigate(['/training']);
            } else {
                //logout
                this.trainingService.cancelSubscriptions();
                this.authChange.next(false);
                this.router.navigate(['/login']);
                this.isAuthenticated = false;
            }
        });
    }

    registerUser(authData: AuthData) {
        this.uiService.loadingStateChanged.next(true);
        this.afauth.auth.createUserWithEmailAndPassword(
            authData.email,
            authData.password
        ).then(result => {
            this.uiService.loadingStateChanged.next(false);
            console.log(result);
        })
            .catch(error => {
                this.snackBar.open(error.message, null, {
                    duration: 3000
                });
                this.uiService.loadingStateChanged.next(false);
                // console.log(error);
            });


    }


    login(authData: AuthData) {
        this.uiService.loadingStateChanged.next(true);
        //AngularFireAuth automatically parses and stores auth token on successful login
        this.afauth.auth.signInWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                console.log(result);
                this.uiService.loadingStateChanged.next(false);
            })
            .catch(error => {
                this.snackBar.open(error.message, null, {
                    duration: 3000
                });
                this.uiService.loadingStateChanged.next(false);
                // console.log(error);
            });

    }

    logout() {
        this.afauth.auth.signOut();
    }

    isAuth() {
        return this.isAuthenticated;
    }


} 