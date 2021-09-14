import { atom, selector, useRecoilState } from 'recoil';

export const dataLoadState = atom({
  key: 'dataLoadState',
  default: false,
});
