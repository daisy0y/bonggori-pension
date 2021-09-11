import firebase from 'firebase';

export const signUp = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};

export const signIn = (email: string, password: string) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};
