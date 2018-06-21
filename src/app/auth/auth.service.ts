import { User } from "./user.model";
import { AuthData } from "./auth-data.model";

export class AuthService {
    private user: User;

    registerUser(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString();
        }
    }


    login(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 10000).toString();
        }
    }

    logout() {
        this.user = null;
    }

    getUser() {
        // spread properties to create new User with same data [deep copy] to break the reference
        return {...this.user };
    }

    isAuth() {
        return this.user != null;
    }
}