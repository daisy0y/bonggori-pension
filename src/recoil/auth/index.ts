import { atom, selector } from 'recoil';

export const userEmailState = atom<string>({
  key: 'userEmailState',
  default: null,
});

export const isLoginSelector = selector({
  key: 'isLoginSelector',
  get: ({ get }) => {
    const emailState = get(userEmailState);
    return emailState ? true : false;
  },
});
