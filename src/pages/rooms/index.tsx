import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { useSetRecoilState } from 'recoil';
import { selectRoomState } from 'recoil/rooms';

import { CommonTab as RoomsTab, CommonBanner, RoomsItem } from 'components';
import { MainRooms, RoomContent } from 'models/Rooms/rooms.model';
// import { useRoomTypes, useRooms } from 'lib/hooks';
import { getMainRoomsType } from 'enums';

const Rooms = () => {
  // const { data: tabList } = useRoomTypes();
  // const [currentTab, setCurrentTab] = useState<string>(tabList[0]?.roomTypeName || '고미');

  const router = useRouter();

  // const { data: roomList } = useRooms(currentTab);
  // const [rooms, setRooms] = useState<RoomContent[]>(roomList as RoomContent[]);

  const setSelectRoomData = useSetRecoilState(selectRoomState);

  const handleMoveToDetailPage = (room: RoomContent) => {
    setSelectRoomData(room);
    const enRoomType = getMainRoomsType.changeValue(room.roomType['roomTypeName']);
    return router.push(`/rooms/${enRoomType}-${room.roomId}`);
  };

  // const roomContent = useMemo(
  //   () =>
  //     rooms.map((room, idx) => (
  //       <RoomsItem key={idx} roomName={room.roomName} roomImage="" onClick={() => handleMoveToDetailPage(room)} />
  //     )),
  //   [rooms],
  // );

  // const handleGetRoomsData = useCallback(
  //   selecTab => {
  //     setCurrentTab(selecTab);
  //   },
  //   [currentTab],
  // );

  // useEffect(() => {
  //   if (roomList.length > 0) {
  //     setRooms(roomList as RoomContent[]);
  //   }
  // }, [roomList]);

  return (
    <>
      <Head>
        <title>BGR | 객실리스트</title>
      </Head>
      <div>
        <CommonBanner />
        {/* <RoomsTab
          tabList={(tabList as MainRooms[]) || []}
          onChange={handleGetRoomsData}
          onClick={handleMoveToDetailPage}
          roomContent={roomContent}
        /> */}
      </div>
    </>
  );
};

export default Rooms;
