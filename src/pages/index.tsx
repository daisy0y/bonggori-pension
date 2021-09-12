import { useEffect } from 'react';

import firebase from 'firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { deleteSession, generateString, setSession, getSession } from 'lib/storage';
export default function Home() {
  const [user, userLoading] = useAuthState(firebase.auth());
  useEffect(() => {
    if (user) {
      deleteSession('anonymous');
    } else if (!getSession('anonymous')) {
      setSession('anonymous', generateString());
    }
  }, [user]);
  return <div>HOME</div>;
}
