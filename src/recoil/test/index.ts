import { atom } from 'recoil';

export const testState = atom({
  key: 'testState',
  default: '바뀌기전이에옴',
});

export const testLoadingValue = atom<boolean>({
  key: 'testLoadingValue',
  default: true,
});

export const testErrorValue = atom<Error>({
  key: 'testErrorValue',
  default: null,
});
