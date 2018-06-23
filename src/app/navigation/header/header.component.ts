import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

// import { AuthService } from '../../auth/auth.service';
import * as fromRoot from '../../app.reducer';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  // isAuth: boolean = false;
  isAuth$: Observable<boolean>;
  // authSubscription: Subscription;

  constructor(private store: Store<fromRoot.State>, private authService: AuthService ) { }
  // constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);

    // this.authSubscription = this.authService.authChange.subscribe(authStatus => {
    //   this.isAuth = authStatus;
    // })
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
    
  }

  // ngOnDestroy() {
  //   if(this.authSubscription) {
  //     this.authSubscription.unsubscribe();
  //   }
  // }
}
