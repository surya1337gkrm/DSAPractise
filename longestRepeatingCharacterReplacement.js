// Leetcode: https://leetcode.com/problems/longest-repeating-character-replacement/description/

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var characterReplacement = function (s, k) {
  // Approach 01: Bruteforce approach | TC: O(n^2) approx.
  // take substrings approach - get each substring(i,j) of the given string starting from 0th index
  // and keep track of the character frequency using a map.
  // also update maximum frequency of a character in the substring.
  // Now, required changes(character replacements required) will be the
  // difference between the length of the substring and the maximum frequency of a character in the substring.
  // i.e if AAB is the substring - we need to flip B to A to make the substring of max length
  // which is length of substring(3) - maxFrequency(which is 2) = 1 change.

  // if the changes<=k, then update the maximum substring length else skip the substring and move to the next substring.

  // This approach might end with an TLE error when the input string is very big.
  let max = 0; // to track the maximum length of the substring
  for (let i = 0; i < s.length; i++) {
    const map = new Map(); // we have to keep track of characater frequency for each substring
    let maxFreq = 0; // to keep track of maximum frequency of any character
    for (let j = i; j < s.length; j++) {
      map.set(s[j], (map.get(s[j]) || 0) + 1);
      maxFreq = Math.max(maxFreq, map.get(s[j]));

      // changes has to be made in the substring to make it maximum string with repeated chars
      // = (length of the substring)-(max freq char length). result value is the number of chars we need to change
      let changes = j - i + 1 - maxFreq;
      if (changes <= k) {
        // valid substring with the changes
        max = Math.max(max, j - i + 1);
      } else break;
    }
  }
  return max;
};
console.log(characterReplacement((s = 'ABAB'), (k = 2)));
console.log(characterReplacement((s = 'AABABBA'), (k = 1)));

// Approach 02: using 2 pointer & sliding window approach
var characterReplacementV2 = function (s, k) {
  // Use a map to store the frequency of each character as we traverse through the string using left & right pointers
  let l = 0,
    r = 0,
    max = 0,
    maxFreq = 0;
  const map = new Map();
  while (r < s.length) {
    // update the frequency of the character at the right pointer
    map.set(s[r], (map.get(s[r]) || 0) + 1);
    // update the max frequency of any character
    maxFreq = Math.max(maxFreq, map.get(s[r]));

    //const changes = (r-l+1)-maxFreq
    // if the required changes > k then we need to shift l until required changes<=k
    // during this process, update the maxFreq value as well when leading l elements are being removed.
    while (r - l + 1 - maxFreq > k) {
      // remove the character at the left pointer
      map.set(s[l], map.get(s[l]) - 1);
      maxFreq = 0;
      for (const key of map.keys()) {
        maxFreq = Math.max(maxFreq, map.get(key));
      }
      l++;
    }

    // update the max substring length
    max = Math.max(max, r - l + 1);
    r++;
  }
  return max;
};
console.log(characterReplacementV2((s = 'ABAB'), (k = 2)));
console.log(characterReplacementV2((s = 'AABABBA'), (k = 1)));

// In approach 02, inside the while loop, when the changes>k, l movies a few steps and at worst case,
// l might move n steps taking O(n) time.
// This doesnt happen during each iteration so overall tc=O(2n)*(26) for updating the maxFreq

// Approach 03: Almost simillar to Approach 02 but we will try to avoid the inner loops & additional maxFreq update loop
// We can skip updating the maxFreq when removing the left pointer element because once we have the substring with maxFreq,
// we will only look for another substring with length+1 atleast, which doesnt depend on the maxFreq anyway. So we can skip this check
// and just update the maxFreq when we are adding the right pointer element.

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var characterReplacementV3 = function (s, k) {
  let l = 0,
    r = 0,
    max = 0,
    maxFreq = 0;
  const map = new Map();
  while (r < s.length) {
    map.set(s[r], (map.get(s[r]) || 0) + 1);
    maxFreq = Math.max(maxFreq, map.get(s[r]));

    const changes = r - l + 1 - maxFreq;
    if (changes <= k) {
      max = Math.max(max, r - l + 1);
    } else {
      map.set(s[l], map.get(s[l]) - 1);
      // maxFreq=0
      // for(let key of map.keys()){
      //     maxFreq=Math.max(maxFreq,map.get(key))
      // }
      l++;
    }
    r++;
  }
  return max;
};
console.log(characterReplacementV3((s = 'ABAB'), (k = 2)));
console.log(characterReplacementV3((s = 'AABABBA'), (k = 1)));