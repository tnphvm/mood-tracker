import { firebaseAuth, googleProvider } from "../config/firebaseConfig";

export function loginWithGoogle() {
    return firebaseAuth().signInWithRedirect(googleProvider);
}

export function logout() {
    return firebaseAuth().signOut();
}