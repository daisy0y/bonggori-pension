import { atom } from 'recoil';

export const userEmailState = atom<String>({
  key: 'userEmail',
  default: null,
});
