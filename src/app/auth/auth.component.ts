import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  authForm!: FormGroup;


  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.authForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.pattern(this.validEmailRegex)]),
      password: new FormControl('', Validators.required),
    });
  }

  signUp() {
    const { username, password } = this.authForm.value;
    if (this.authForm.valid) {
      this.authService.signup(username, password)
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
    } else {
      Object.keys(this.authForm.controls).forEach((field) => {
        const control = this.authForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
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

  signIn() {    
    const { username, password } = this.authForm.value;
    if (this.authForm.valid) {
      this.hasErrors = false;
      this.authService.signin(username, password)
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
      Object.keys(this.authForm.controls).forEach((field) => {
        const control = this.authForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
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
