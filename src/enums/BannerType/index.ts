export enum PageName {
  ROOMS = 'Rooms',
}

export const getBannerName = (path: string) => {
  const originPath = path.split('/')[1].toUpperCase();
  return PageName[originPath];
};
