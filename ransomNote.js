// leetcode: https://leetcode.com/problems/ransom-note/description/

/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function (ransomNote, magazine) {
  // base condition: as we need to construct the word from characters in magazine
  // return false if the length of the ransomNote > len(magazine)

  if (ransomNote.length > magazine.length) return false;

  // Approach 01: create a map of count of each character in magazine
  // Time complexity: O(m+n)
  // Space complexity: O(m) where m -> length of magazine as we are storing all characters
  const map = {};
  for (const ch of magazine) {
    if (map[ch] === undefined) map[ch] = 1;
    else map[ch]++;
  }

  // now iterate through ransomNote and check if the characters exist in the map
  // if not or count === 0, return false
  for (const ch of ransomNote) {
    if (map[ch] === undefined || map[ch] === 0) return false;
    else map[ch]--;
  }

  return true;

  //Approach 02: iterating over the array and checking simultaneously
  // Bad approach | time complexity: O(n*m)
  if (ransomNote.length > magazine.length) return false;

  const mArr = magazine.split('');

  for (let ch of ransomNote) {
    // indexOf takes o(m)
    const idx = mArr.indexOf(ch);
    if (idx === -1) return false;
    else {
      mArr[idx] = '';
    }
  }

  return true;
};
