export const getMostviewed = (arr) => {
    const count = {};
    
    arr.forEach((el, i) => {
      const element = el;
      count[element] = (count[element] || 0) + 1;
    });
  let mostRepetitiveElement;
  let highestCount = 0;
  for (const element in count) {
    if (count[element] > highestCount) {
      mostRepetitiveElement = element;
      highestCount = count[element];
    }
  }
  return mostRepetitiveElement;
};
