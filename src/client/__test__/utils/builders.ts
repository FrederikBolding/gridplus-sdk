export const getFwVersionsList = () => {
  const arr = [];
  Array.from({ length: 1 }, (x, i) => {
    Array.from({ length: 20 }, (y, j) => {
      Array.from({ length: 10 }, (z, k) => {
        arr.push([i, j, k])
      });
    });
  });
  return arr
}
