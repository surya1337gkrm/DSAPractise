// https://leetcode.com/problems/fizz-buzz/

/**
 * @param {number} n
 * @return {string[]}
 */
var fizzBuzz = function (n) {
  // instead of using i%3 & i%5...using counters
  const res = [];
  let i = 1,
    fizz = 0,
    buzz = 0;
  while (i <= n) {
    fizz++;
    buzz++;
    if (fizz === 3 && buzz === 5) {
      fizz = 0;
      buzz = 0;
      res.push('FizzBuzz');
    } else if (fizz === 3) {
      fizz = 0;
      res.push('Fizz');
    } else if (buzz === 5) {
      buzz = 0;
      res.push('Buzz');
    } else {
      res.push(`${i}`);
    }
    i++;
  }
  return res;
};
