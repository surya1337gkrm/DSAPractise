// leetcode: https://leetcode.com/problems/valid-anagram/description/

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  // in order to check if the two strings are anagram's
  // consider a map and update the count of char occurences
  // and for next string, iterate and if the character exists decrement
  // if not / count=0; return false

  // if the strings length is not equal, return false

  const map = {};

  for (let i = 0; i < s.length; i++) {
    if (map[s[i]] === undefined) {
      map[s[i]] = 1;
    } else {
      map[s[i]] += 1;
    }
  }

  for (let i = 0; i < t.length; i++) {
    if (map[t[i]] === undefined || map[t[i]] === 0) return false;
    else {
      map[t[i]] -= 1;
    }
  }

  return true;
};
