const generateRandom12DigitNumber = () => {
  let min = 100000000000; // 12 digit minimum
  let max = 999999999999; // 12 digit maximum
  let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
};

module.exports = {generateRandom12DigitNumber};
