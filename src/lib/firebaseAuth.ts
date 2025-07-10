import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'; // Import signInWithEmailAndPassword
import app from './firebase'; // Import the initialized Firebase app

const auth = getAuth(app);

export const signupWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Signed up
    const user = userCredential.user;
    console.log('User signed up:', user);
    return user; // Return the signed-up user
  } catch (error: any) {
    // Handle errors
    console.error('Error signing up:', error);
    throw error; // Re-throw the error so the calling component can handle it
  }
};

// The login function here
export const loginWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // Signed in
    const user = userCredential.user;
    console.log('User signed in:', user);
    return user; // Return the signed-in user
  } catch (error: any) {
    // Handle errors
    console.error('Error signing in:', error);
    throw error; // Re-throw the error so the calling component can handle it
  }
};

// You will add other authentication functions here (e.g., signInWithGoogle, etc.)
