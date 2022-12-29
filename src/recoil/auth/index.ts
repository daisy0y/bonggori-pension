import { atom, selector } from 'recoil';

export const userEmailState = atom<string>({
  key: 'userEmailState',
  default: null,
});

