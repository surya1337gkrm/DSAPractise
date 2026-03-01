// Leetcode: https://leetcode.com/problems/time-needed-to-rearrange-a-binary-string/description/

/**
 * @param {string} s
 * @return {number}
 */
var secondsToRemoveOccurrences = function (s) {
  // Approach: for each character in the string, if it is '0', increment zeroes count
  // if not then check how many zeroes were there before this '1' and add that to the total seconds count

  // example: 001 -> 010 -> 100 so we need 2 seconds to re-arrange the string
  let zeroes = 0,
    time = 0;
  for (let char of s) {
    if (char === '0') zeroes++;
    else if (zeroes > 0) {
      time = Math.max(time + 1, zeroes);
    }
  }
  return time;
};
