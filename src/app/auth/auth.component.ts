import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  email!: string;
  password!: string;
  hasErrors!: boolean;
  public validEmailRegex = /^[A-Za-z0-9!#$%&'*+/=?^_{|}()~-]+(\.[_A-Za-z0-9!#$%&'*+/=?^_{|}()~-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,15})$/;


  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }


  signUp(email: string, password: string) {
    this.authService.signup(email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });

  }


  googleAuth() {
    this.authService.sigupWithGoogle()
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {

        // Handle Errors here.
        const errorCode = error?.code;
        const errorMessage = error?.message;
        // The email of the user's account used.
        const email = error?.customData?.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  githubAuth() {
    // const auth = getAuth();
    this.authService.sigupWithGithub()
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        // ...
      });

  }

  signIn(email: string, password: string) {    
    if (email && password && this.validEmailRegex.test(email)) {
      this.hasErrors = false;
      this.authService.signin(email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;

        this.router.navigate(["/profile"]);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    } else {
      this.hasErrors = true;
    }
  }

  signOut() {

    this.authService.signout().then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });

  }
}
