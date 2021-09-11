import firebase from 'firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { atom, selector } from 'recoil';

export const testState = atom({
  key: 'testState',
  default: '바뀌기전이에옴',
});

export const testLoadingValue = atom<boolean>({
  key: 'testLoadingValue',
  default: true,
});

export const testErrorValue = atom<Error>({
  key: 'testErrorValue',
  default: null,
});

// export const testValue = selector({
//   key: 'getTestValue',
//   get: async () => {
//     return await useCollection(firebase.firestore().collection('imform'), {
//       snapshotListenOptions: { includeMetadataChanges: true },
//     });
//   },
// });
