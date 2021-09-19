import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Head from 'next/head';

import { CommonTab as RoomsTab, CommonBanner, RoomsItem } from 'components';
import { MainRooms, RoomContent } from 'models/Rooms/rooms.model';
import { useRoomTypes, useRooms } from 'hooks';

const Rooms = () => {
  const { data: tabList } = useRoomTypes();
  const [currentTab, setCurrentTab] = useState<string>(tabList[0]?.roomTypeName || '고미');

  // TODO: stop fetching data from firestore when all data(of tabs) are fetched
  const { data: roomList } = useRooms(currentTab);
  const [rooms, setRooms] = useState<RoomContent[]>(roomList as RoomContent[]);

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
      setRooms(roomList as RoomContent[]);
    }
  }, [roomList]);

  return (
    <>
      <Head>
        <title>BGR | 객실리스트</title>
      </Head>
      <div>
        <CommonBanner />
        <RoomsTab tabList={(tabList as MainRooms[]) || []} onChange={getRoomsData} roomContent={roomContent} />
      </div>
    </>
  );
};

export default Rooms;
