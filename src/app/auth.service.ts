import { Injectable } from "@angular/core";
import { initializeApp } from "firebase/app";
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyB_hAoXVz2zRdvYvklTtnHIxM9DpelvDb8",
    authDomain: "fir-authentication-5ea53.firebaseapp.com",
    projectId: "fir-authentication-5ea53",
    storageBucket: "fir-authentication-5ea53.appspot.com",
    messagingSenderId: "911925079276",
    appId: "1:911925079276:web:25aace51cd5bb0d934c9c9",
    measurementId: "G-9B31KYYWS9"
})

const auth = getAuth(firebaseApp);
const providerGoogleAuth = new GoogleAuthProvider();
const providerGithubAuth = new GithubAuthProvider();

@Injectable()

export class AuthService {
    constructor() { }

    async signup(email: string, password: string) {
        return await createUserWithEmailAndPassword(auth, email, password)
    }

    async sigupWithGoogle() {
        return await signInWithPopup(auth, providerGoogleAuth)
    }

    async sigupWithGithub() {
        return await signInWithPopup(auth, providerGithubAuth)
    }

    async signin(email: string, password: string) {
        return await signInWithEmailAndPassword(auth, email, password)
    }

    async signout() {
        return await signOut(auth);
    }
}