import { atom } from 'recoil';

export const roomsState = atom({
  key: 'roomsState',
  default: [],
});

export const selectRoomState = atom({
  key: 'selectRoomState',
  default: null,
});
