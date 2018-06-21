import { User } from "./user.model";
import { AuthData } from "./auth-data.model";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private user: User;

    constructor(private router: Router) {

    }

    registerUser(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString();
        }
        this.authSuccessfully();
    }


    login(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString();
        }
        this.authSuccessfully();
    }

    logout() {
        this.user = null;
        this.authChange.next(false);
        this.router.navigate(['/login']);
    }

    getUser() {
        // spread properties to create new User with same data [deep copy] to break the reference
        return { ...this.user };
    }

    isAuth() {
        return this.user != null;
    }

    private authSuccessfully() {
        this.authChange.next(true);
        this.router.navigate(['/training']);
    }
}