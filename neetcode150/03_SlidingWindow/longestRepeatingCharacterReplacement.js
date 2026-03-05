// Leetcode: https://leetcode.com/problems/longest-repeating-character-replacement/

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var characterReplacement = function (s, k) {
  // Approach: use sliding window/2 pointer approach
  // start wth left and right pointers at 0th index and store the frequency of each character
  // in the current window. also keep track of the maximum frequency of any character in the current window.
  // For any window, changes required to make the window with all same characters
  // = (length of the window) - (max frequency of any character in the window)
  // if the changes required <=k, then update the maximum length
  // if not, then move the window

  let l = 0,
    r = 0,
    maxLen = 0,
    maxFreq = 0;
  const map = new Map();
  while (r < s.length) {
    if (map.has(s[r])) {
      map.set(s[r], map.get(s[r]) + 1);
    } else map.set(s[r], 1);

    maxFreq = Math.max(maxFreq, map.get(s[r]));
    // in order to make this window with all same characters,
    // we need to change (len of window)-(maxFreq)
    const changes = r - l + 1 - maxFreq;
    if (changes <= k) {
      maxLen = Math.max(maxLen, r - l + 1);
    } else {
      map.set(s[l], map.get(s[l]) - 1);
      // we dont have to decrease the maxFreq value here because 
      // we are only interested in the maximum frequency of any character in the window 
      // and it will be updated when we move the right pointer.
      l++;
    }
    r++;
  }
  return maxLen;
};

console.log(characterReplacement((s = 'ABAB'), (k = 2)));
console.log(characterReplacement((s = 'AABABBA'), (k = 1)));

// we can make use of an array of fixed length 26 to update the frequency of the characters.
// arr[s[r].charCodeAt(0) - 'A'.charCodeAt(0)]++ instead of using a map to store the frequency of characters. 
// This will be faster than using a map.