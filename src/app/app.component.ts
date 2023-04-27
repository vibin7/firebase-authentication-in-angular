import { Component, OnInit } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, Auth, signInWithPopup, onAuthStateChanged, setPersistence, browserSessionPersistence } from "firebase/auth";
import { initializeApp } from "firebase/app"
import { AuthService } from './auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'firebase-authentication-in-angular';
  email!: string;
  password!: string;

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.router.navigate(["/profile"]);
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
      } else {
        this.router.navigate(["/auth"]);

        // User is signed out
        // ...
      }
    });
  }


}
