import { firestore, useFirestore } from 'hooks';

export const useRooms = (room_type: string) =>
  useFirestore(firestore.collection('rooms').where('roomType', '==', firestore.doc(`roomTypes/${room_type}`)), [
    room_type,
  ]);
