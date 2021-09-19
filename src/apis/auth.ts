import firebase from 'firebase';
import Cookies from 'universal-cookie';
import { message } from 'antd';
import { deleteSession, generateString, setSession } from 'lib/storage';
export const loginApi = async (email: string, password: string) => {
  try {
    const res = await firebase.auth().signInWithEmailAndPassword(email, password);
    const idToken = (await res.user.getIdToken()).toString;
    const userEmail = res.user.email;

    const cookies = new Cookies();

    cookies.set('id_token', idToken, { path: '/' });

    return userEmail;
  } catch (error) {
    console.error('Error 발생' + error);
    message.error('로그인에 실패했습니다. 다시 시도해주세요.');
  }
};

export const joinApi = async (email: string, password: string) => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    deleteSession('anonymous');
  } catch (error) {
    console.error('Error 발생' + error);
    message.error('회원가입에 실패 했습니다. 다시 시도해주세요.');
  }
};

export const logoutApi = async () => {
  try {
    await firebase.auth().signOut();
    const cookies = new Cookies();

    cookies.remove('id_token');
    setSession('anonymous', generateString());
  } catch (error) {
    console.error('Error 발생' + error);
    message.error('로그아웃에 실패했습니다. 다시 시도해주세요.');
  }
};
