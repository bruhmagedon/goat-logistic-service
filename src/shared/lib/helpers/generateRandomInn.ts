export const generateRandomInn = (): string => {
  let inn = '';
  for (let i = 0; i < 12; i++) {
    inn += Math.floor(Math.random() * 10);
  }
  return inn;
};
