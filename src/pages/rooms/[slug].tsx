import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { atom, useRecoilValue } from 'recoil';
import { selectRoomState } from 'recoil/rooms';

import { RoomContent } from '../../models/Rooms/rooms.model';
import { firestore, useFirestore } from 'hooks';

const RoomDetail = () => {
  const getSelectRoomData = useRecoilValue(selectRoomState);
  const [roomData, setRoomData] = useState<RoomContent>(getSelectRoomData);
  useEffect(() => {
    if (!getSelectRoomData) {
      // useFirestore(firestore.collection('rooms').where('roomType', '==', firestore.doc(`roomTypes/${room_type}`)), [
      //   room_type,
      // ]);
    }
  }, []);
  const router = useRouter();
  return (
    <>
      <div>{router.query.slug}</div>
      <div>메롱 슬러그당</div>
    </>
  );
};

export default RoomDetail;
