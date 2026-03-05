// Leetcode: https://leetcode.com/problems/permutation-in-string/description/

/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */

const testCases = [
  ['ab', 'eidbaooo'],
  ['ab', 'eidboaoo'],
];
// Approach: For two strings to be permutations of each other, they must have the same frequency of characters.
var checkInclusion = function (s1, s2) {
  // Base condition: if s1 is longer than s2, then s1 cannot be a permutation of s2
  if (s1.length > s2.length) return false;

  const s1Map = new Map();
  const s2Map = new Map();
  // iterate through s1 and s2 and update the frequency of characters in the maps
  for (let i = 0; i < s1.length; i++) {
    s1Map.set(s1[i], (s1Map.get(s1[i]) || 0) + 1);
    s2Map.set(s2[i], (s2Map.get(s2[i]) || 0) + 1);
  }
  // s2 will be either of same length as s1 or longer than s1.
  // helper function to compare the frequency of characters in the maps
  const isMatch = (map1, map2) => {
    for (const key of map1.keys()) {
      if (map1.get(key) !== map2.get(key)) return false;
    }
    return true;
  };

  // use a sliding window of size s1.length and check if the frequency of characters
  // in the window is same as the frequency of characters in s1
  let l = 0,
    r = s1.length - 1;
  while (r < s2.length) {
    if (isMatch(s1Map, s2Map)) return true;
    // move the window to the right and update the frequency of characters in s2Map
    s2Map.set(s2[l], s2Map.get(s2[l]) - 1);
    l++;
    r++;
    s2Map.set(s2[r], (s2Map.get(s2[r]) || 0) + 1);
  }
  return false;
};

testCases.forEach(testCase => console.log(checkInclusion(...testCase)));

// Approach 02: simillar approach but using an array of fixed length 26 to track the frequency
var checkInclusionV2 = function (s1, s2) {
  if (s1.length > s2.length) return false;
  const s1Arr = new Array(26).fill(0);
  const s2Arr = new Array(26).fill(0);

  for (let i = 0; i < s1.length; i++) {
    s1Arr[s1.charCodeAt(i) - 97]++;
    s2Arr[s2.charCodeAt(i) - 97]++;
  }

  const isMatch = (arr1, arr2) => {
    //return arr1.toString() === arr2.toString();
    return arr1.every((val, index) => val === arr2[index]);
  };

  let l = 0,
    r = s1.length - 1;
  while (r < s2.length) {
    if (isMatch(s1Arr, s2Arr)) return true;
    s2Arr[s2.charCodeAt(l) - 97]--;
    l++;
    r++;
    s2Arr[s2.charCodeAt(r) - 97]++;
  }
  return false;
};
testCases.forEach(testCase => console.log(checkInclusionV2(...testCase)));
