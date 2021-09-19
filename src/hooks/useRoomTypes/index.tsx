import { firestore, useFirestore } from 'hooks';

export const useRoomTypes = () => useFirestore(firestore.collection('roomTypes'), []);
