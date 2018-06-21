import { User } from "./user.model";
import { AuthData } from "./auth-data.model";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    // private user: User;
    private isAuthenticated = false;

    constructor(private router: Router, private afauth: AngularFireAuth) {

    }

    registerUser(authData: AuthData) {
       this.afauth.auth.createUserWithEmailAndPassword(
           authData.email,
           authData.password
       ). then(result => {
           console.log(result);
           this.authSuccessfully();
       })
       .catch(error => {
           console.log(error);
       });

       
    }


    login(authData: AuthData) {
        this.afauth.auth.signInWithEmailAndPassword(authData.email, authData.password)
        . then(result => {
            console.log(result);
            this.authSuccessfully();
        })
        .catch(error => {
            console.log(error);
        });
       
    }

    logout() {
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.router.navigate(['/login']);
    }

    isAuth() {
        return this.isAuthenticated;
    }

    private authSuccessfully() {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
    }
}