import { atom, selector } from 'recoil';

export const userState = atom<any>({
  key: 'userState',
  default: undefined,
});

export const isLoginSelector = selector({
  key: 'isLoginSelector',
  get: ({ get }) => {
    const emailState = get(userState);
    return emailState ? true : false;
  },
});
