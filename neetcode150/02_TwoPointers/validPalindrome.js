// Leetcode: https://leetcode.com/problems/valid-palindrome/description/

/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  // Approach: Convert the string to lowercase and remove non alphanumeric characters.
  // Then use two pointers to check if the string is a palindrome.

  const modStr = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  let l = 0,
    r = modStr.length - 1;

  while (l <= r) {
    if (modStr[l] !== modStr[r]) return false;
    l++;
    r--;
  }
  return true;
};
