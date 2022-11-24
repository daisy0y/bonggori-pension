import Cookies from 'universal-cookie';
import { message } from 'antd';
import { deleteSession, generateString, setSession } from 'lib/storage';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import firebase from 'lib/firebase';
import { collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from 'firebase/firestore';
import { errorCode } from 'lib/constants/errorCode';
import { useRecoilState } from 'recoil';
import { userState } from 'recoil/user';

const auth = getAuth(firebase);
const db = getFirestore(firebase);

export const loginApi = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password)

    if(result){
        const user = result;
        const fetchUserData = await getUserData(user.user.uid)
        return {...fetchUserData}
    }

  
    // const res = await auth.signInWithEmailAndPassword(email, password);
    // const idToken = (await res.user.getIdToken()).toString;
    // const userEmail = res.user.email;

    // const cookies = new Cookies();

    // cookies.set('id_token', idToken, { path: '/' });

    // return userEmail;
  } catch (error) {
    console.error('Error 발생' + error);
    message.error(errorCode[error.code] || '회원가입에 실패했습니다.');
  }
};

export const joinApi = async (email: string, password: string, displayName: string) => {
    try {
        
    const result = await createUserWithEmailAndPassword(auth, email, password)
    let userData;
    if(result){
        userData = {
            displayName: result.user.displayName || displayName,
            email: result.user.email,
            emailVerified: result.user.emailVerified,
            phoneNumber: result.user.phoneNumber,
            photoUrl: result.user.photoURL,
            uid: result.user.uid,
            role: 'user'
        }

        await setDoc(doc(db, "users", result.user.uid), userData);
        await loginApi(email,password)
    }
    deleteSession('anonymous');

    return userData

  } catch (error) {
    console.error('Error 발생' + error);
    console.log(error.code)
    console.log(error.message)
    message.error(errorCode[error.code] || '회원가입에 실패했습니다.');
  }
};

export const logoutApi = async () => {
  try {
    await signOut(auth);
    const cookies = new Cookies();

    cookies.remove('id_token');
    setSession('anonymous', generateString());
  } catch (error) {
    console.error('Error 발생' + error);
    message.error('로그아웃에 실패했습니다. 다시 시도해주세요.');
  }
};

export const checkNickName = async (nickname) => {
    try {
        const q = query(collection(db, "users"), where("displayName", "==", nickname));
        const querySnapshot = await getDocs(q);
        // 같은 값이 없으면 true 리턴
        return querySnapshot.empty

    } catch (error) {
        console.error('Error 발생' + error);
        message.error(error)
    }
}

export const getUserData = async (uid: string) => {
    try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          return {...docSnap.data()}
        } else {
          console.log("No such document!");
        }
 } catch (error) {
        console.error('Error 발생' + error);
        message.error(error)
 }
}