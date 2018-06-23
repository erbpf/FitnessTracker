import { User } from "./user.model";
import { AuthData } from "./auth-data.model";
import { Subject } from "rxjs";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import { TrainingService } from "../training/training.service";
import { UIService } from "../shared/ui.service";
import { Store } from "@ngrx/store";
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';

@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    // private user: User;
    private isAuthenticated = false;

    constructor(
        private router: Router,
        private afauth: AngularFireAuth,
        private trainingService: TrainingService,
        private uiService: UIService,
        private store: Store< fromRoot.State >
    ) { }

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
        this.store.dispatch(new UI.StartLoading());
        
        // this.store.dispatch({type: 'START_LOADING'});
        // this.uiService.loadingStateChanged.next(true);
        this.afauth.auth.createUserWithEmailAndPassword(
            authData.email,
            authData.password
        ).then(result => {
            this.store.dispatch(new UI.StopLoading());
            
            // this.uiService.loadingStateChanged.next(false);
            // this.store.dispatch({type: 'STOP_LOADING'});
            console.log(result);
        })
            .catch(error => {
                this.uiService.showSnackbar(error.message, null, 3000);
                this.store.dispatch(new UI.StopLoading());
                
                // this.store.dispatch({type: 'STOP_LOADING'});
                // this.uiService.loadingStateChanged.next(false);
                // console.log(error);
            });


    }


    login(authData: AuthData) {
        this.store.dispatch(new UI.StartLoading());

        // this.store.dispatch({type: 'START_LOADING'});
        // this.uiService.loadingStateChanged.next(true);
        //AngularFireAuth automatically parses and stores auth token on successful login
        this.afauth.auth.signInWithEmailAndPassword(authData.email, authData.password)
            .then(result => {
                console.log(result);
                this.store.dispatch(new UI.StopLoading());

                // this.store.dispatch({type: 'STOP_LOADING'});
                // this.uiService.loadingStateChanged.next(false);
            })
            .catch(error => {
                this.uiService.showSnackbar(error.message, null, 3000);
                this.store.dispatch(new UI.StopLoading());
                
                // this.store.dispatch({type: 'STOP_LOADING'});
                // this.uiService.loadingStateChanged.next(false);
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