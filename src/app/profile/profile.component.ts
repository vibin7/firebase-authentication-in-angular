import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  auth = getAuth();
  user: any;
  constructor(
    public authService: AuthService,
  ) { }

  ngOnInit(): void {

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {        
        this.user = user;
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }

  signOut() {
    this.authService.signout().then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });

  }

}
