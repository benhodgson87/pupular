const getRandomNearby = (base: number, range: number): number => {
  const min = Math.max(1, base - range);
  const max = base + range;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRange = (number: number) => {
  if (number === 1) return 4;
  if (number < 6) return 6;
  if (number < 12) return 8;
  if (number < 24) return 16;
  if (number < 100) return 32;
  return 64;
};

const createAnswers = (input: number): number[] => {
  const range = getRange(input);

  const resultArray = [input];
  if (input !== 1 && input < 5) resultArray.push(1);
  while (resultArray.length < 3) {
    let randomNum = getRandomNearby(input, range);

    while (randomNum === 0 || resultArray.includes(randomNum)) {
      randomNum = getRandomNearby(input, range);
    }

    resultArray.push(randomNum);
  }

  return resultArray.sort((a, b) => a - b);
};

export { createAnswers };
