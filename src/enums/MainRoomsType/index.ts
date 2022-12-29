export enum MainRoomsType {
  BONGGU = '봉구',
  GOMI = '고미',
  TORI = '토리',
}

export const getMainRoomsType = {
  changeValue: roomType => {
    return Object.values(MainRoomsType).includes(roomType)
      ? Object.keys(MainRoomsType).find(key => MainRoomsType[key] === roomType)
      : 'keyError: MainRoomsType에 해당하는 value가 존재하지 않습니다.';
  },
};
