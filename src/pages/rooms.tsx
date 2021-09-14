import React, { useState, useEffect, useMemo, ChangeEvent, useCallback } from 'react';
import Head from 'next/head';

import firebase from 'firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

import { CommonTab as RoomsTab, CommonBanner, RoomsItem } from 'components';
import { MainRoomsList, RoomsListContent } from 'models/Rooms/rooms.model';
import { useRoomTypes, useRooms, useFirestore, firestore } from '../hooks/useFirestore/index';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { roomsList } from 'recoil/rooms';

const Rooms = () => {
  const { data: tabList } = useRoomTypes();
  const [currentTab, setCurrentTab] = useState<string>(tabList[0]?.roomTypeName || '고미');

  // TODO: stop fetching data from firestore when all data(of tabs) are fetched
  const { data: roomList } = useRooms(currentTab);
  const [rooms, setRooms] = useState<RoomsListContent[]>(roomList as RoomsListContent[]);

  const roomContent = useMemo(
    () => rooms.map((room, idx) => <RoomsItem key={idx} roomName={room.roomName} roomImage="" />),
    [rooms],
  );

  const getRoomsData = useCallback(
    selecTab => {
      setCurrentTab(selecTab);
    },
    [currentTab],
  );

  useEffect(() => {
    if (roomList.length > 0) {
      setRooms(roomList as RoomsListContent[]);
    }
  }, [roomList]);

  return (
    <>
      <Head>
        <title>BGR | 객실리스트</title>
      </Head>
      <div>
        <CommonBanner />
        <RoomsTab tabList={(tabList as MainRoomsList[]) || []} onChange={getRoomsData} roomContent={roomContent} />
      </div>
    </>
  );
};

export default Rooms;
