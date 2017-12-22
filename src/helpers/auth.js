import { firebaseAuth,
         googleProvider,
         fbProvider } from "../config/firebaseConfig";

export function loginWithGoogle() {
    return firebaseAuth().signInWithRedirect(googleProvider);
}

export function loginWithFb() {
   return firebaseAuth().signInWithRedirect(fbProvider);
}

export function logout() {
    return firebaseAuth().signOut();
}