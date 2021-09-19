const generateRandomStringFromCharArray = (
  charArray: string[],
  size: number
): string => {
  const arraySize = charArray.length - 1;
  if (size > arraySize) {
    return "";
  }

  let randomString = "";
  for (let i = 0; i < size; i++) {
    const randomIndex = randomIntFromInterval(0, arraySize);

    const randomChar = charArray[randomIndex];

    randomString += randomChar;
  }

  return randomString;
};

const randomIntFromInterval = (min: number, max: number) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export { generateRandomStringFromCharArray, randomIntFromInterval };
