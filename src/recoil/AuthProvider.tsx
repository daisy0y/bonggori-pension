import { getUserData } from 'apis/auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebase from 'lib/firebase';
import { deleteSession, generateString, getSession, setSession } from 'lib/storage';
import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil';
import { userState } from './user';

function AuthProvider() {
    const auth = getAuth(firebase);
    const user = auth.currentUser;
    const [userData, setUser] = useRecoilState(userState);

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uid = user.uid;
                const result = await getUserData(uid)
                setUser({ ...result })
                deleteSession('anonymous');
            } else {
                // 로그아웃 상태일때
            }
        });
    }, [])

    useEffect(() => {
        if (!user && !userData && !getSession('anonymous')) {
            setSession('anonymous', generateString());
            setUser(undefined)

        }
    }, [user, userData]);
    return <></>
}

export default AuthProvider