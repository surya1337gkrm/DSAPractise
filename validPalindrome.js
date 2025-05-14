// leetcode: https://leetcode.com/problems/valid-palindrome/description/

/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  // remove the non alpha characters from the string and convert all cpaital characters to lower case
  const modStr = s.replace(/[^a-zA-z0-9]/gi, '').toLowerCase();

  // instead of using .split and join methods using two pointers to check for palindrome

  let l = 0,
    r = modStr.length - 1;

  // early return
  if (modStr[l] !== modStr[r]) return false;

  while (l <= r) {
    if (modStr[l] !== modStr[r]) return false;
    else {
      l++;
      r--;
    }
  }

  // if we are past the while loop, return true
  return true;
};
