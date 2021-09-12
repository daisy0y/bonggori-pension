import React, { useEffect } from 'react';

import firebase from 'firebase';
import { atom, useRecoilState } from 'recoil';

import { useCollection } from 'react-firebase-hooks/firestore';

import { dataLoading } from 'recoil/ui';

export const useFirestore = (collection: string) => {
  const [lodingState, setLodingState] = useRecoilState(dataLoading);

  const [value, loading, error] = useCollection(firebase.firestore().collection(collection), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  const data = value?.docs.map(item => item.data());

  useEffect(() => {
    setLodingState(loading);
  }, [loading]);

  return { data, lodingState, error };
};
