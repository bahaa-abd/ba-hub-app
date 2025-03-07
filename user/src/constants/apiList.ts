export const PAGE_SIZE = 10;

export const isThereNext = (total: number, page: number) => {
  const numOfPages = total / PAGE_SIZE;
  return numOfPages > page;
};

export const isTherePrev = (page: number) => {
  return 1 < page;
};
