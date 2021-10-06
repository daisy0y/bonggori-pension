import { firestore, useFirestore } from 'lib/hooks';

export const useRooms = (room_type: string) => {
  const roomsData = useFirestore(
    firestore.collection('rooms').where('roomType', '==', firestore.doc(`roomTypes/${room_type}`)),
    [room_type],
  );

  if (roomsData.data) {
    roomsData.data.map(data => {
      if (!data.roomType) console.log('Something went wrong - roomType does not exists in useRooms: ', data);
      if (Object.keys(data.roomType).includes('firestore'))
        data.roomType.get().then(doc => (data.roomType = doc.data()));
    });
  }

  return roomsData;
};
