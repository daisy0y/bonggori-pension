import firebase from 'firebase';
import Cookies from 'universal-cookie';

export const login = async (email: string, password: string) => {
  try {
    const res = await firebase.auth().signInWithEmailAndPassword(email, password);
    const idToken = (await res.user.getIdToken()).toString;
    const userEmail = res.user.email;

    const cookies = new Cookies();

    cookies.set('id_token', idToken, { path: '/' });

    return userEmail;
  } catch (error) {
    console.error('Error 발생' + error);
  }
};
