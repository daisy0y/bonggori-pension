import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { dataLoadState } from 'recoil/ui';
import firebase from 'firebase';
import 'firebase/firestore';
import { firestoreData } from 'models/Firestore/firestore.model';

export const firestore = firebase.firestore();
export const useFirestore = (ref: firebase.firestore.CollectionReference | firebase.firestore.Query, props: any[]) => {
  const setLoadingState = useSetRecoilState(dataLoadState);
  const [data, setData] = useState<firestoreData>({
    data: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    // initialize data
    setData({
      data: [],
      loading: true,
      error: null,
    });

    // fetch data from firestore
    ref
      .get()
      .then(snapshot => {
        setData({
          data: snapshot.docs.map(doc => doc.data()),
          loading: false,
          error: null,
        });
      })
      .catch(error => {
        setData({
          data: [],
          loading: false,
          error,
        });
      });
  }, props);

  useEffect(() => {
    setLoadingState(data.loading);
  }, [data.loading]);

  return data;
};
