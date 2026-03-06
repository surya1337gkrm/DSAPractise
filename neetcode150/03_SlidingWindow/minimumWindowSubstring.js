// Leetcode: https://leetcode.com/problems/minimum-window-substring/description/

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */

const testCases = [
  ['ADOBECODEBANC', 'ABC'],
  ['a', 'a'],
  ['a', 'aa'],
];
var minWindow = function (s, t) {
  //Base condition: if s length is less than t length, then return empty string
  if (s.length < t.length) return '';

  const map = new Map();
  // store the frequency of characters in t in a map
  for (const ch of t) {
    map.set(ch, (map.get(ch) || 0) + 1);
  }

  // Approach: we need to match all the characters in t with the characters in s
  // use a 2 pointer & sliding window approach
  let totalChar = t.length;
  let l = 0,
    r = 0;
  let minWindow = [0, Infinity];
  while (r < s.length) {
    // if the character at r pointer is present in the map, then decrease the frequency of that character in the map
    const rVal = map.get(s[r]);
    if (rVal !== undefined) {
      // if the frequency of the character in the map is greater than 0, then decrease the totalChar variable
      if (rVal > 0) {
        totalChar--;
      }
      map.set(s[r], rVal - 1);
    }

    // window will be valid when the totalChar is 0 i.e, all the characters in t are present in the current window
    while (totalChar === 0) {
      // check if the current window is smaller than the minimum window found so far,
      // if yes, then update the minimum window
      if (r - l + 1 < (minWindow[1] - minWindow[0] + 1)) {
        minWindow = [l, r];
      }
      // now shrink the window
      // when shrinking, check if the character at l is present in t string
      // if yes, then increase the frequency of that character in the map and
      //  if the frequency becomes greater than 0, then increase the totalChar variable
      const lVal = map.get(s[l]);
      if (lVal !== undefined) {
        map.set(s[l], lVal + 1);
        if (lVal + 1 > 0) {
          totalChar++;
        }
      }
      l++; // move the left pointer to the right
    }
    r++; // move the right pointer to the right
  }
  // if minWindow is not updated, then return empty string
  return minWindow[1] >= s.length
    ? ''
    : s.slice(minWindow[0], minWindow[1] + 1);
};

testCases.forEach(testCase => console.log(minWindow(...testCase)));
