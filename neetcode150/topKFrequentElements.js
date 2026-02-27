// Leetcode: https://leetcode.com/problems/top-k-frequent-elements/description/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */

const testCases = [
  [[1, 1, 1, 2, 2, 3], 2],
  [[1], 1],
  [[1, 2, 1, 2, 1, 2, 3, 1, 3, 2], 2],
];
var topKFrequent = function (nums, k) {
  // Approach 01: use a map to store the frequency of each element
  // then sort the map by the frequency in descending order and return the first k elements
  // TC: O(nlogn) as sorting is involved

  const map = new Map();
  for (let num of nums) {
    if (map.has(num)) {
      map.set(num, map.get(num) + 1);
    } else {
      map.set(num, 1);
    }
  }
  // sort the map by the frequency in descending order
  const sortedMap = [...map].sort((a, b) => b[1] - a[1]);

  // get the first k elements
  const result = [];
  for (let i = 0; i < k; i++) {
    result.push(sortedMap[i][0]);
    if (result.length === k) return result;
  }
};
testCases.forEach(testCase => console.log(topKFrequent(...testCase)));

const topKFrequentV2 = function (nums, k) {
  // Approach 02: use a map to store the frequency of each element
  // and instead of sorting the map by frequency, group the elements by frequency
  // and then return the first k elements
  // TC: O(n) as we are iterating through the array once and grouping the elements

  const map = new Map();
  for (let num of nums) {
    if (map.has(num)) {
      map.set(num, map.get(num) + 1);
    } else {
      map.set(num, 1);
    }
  }

  // group the numbers by frequency
  const groupByFreq = [];
  for (const [num, freq] of map) {
    if (groupByFreq[freq]) {
      groupByFreq[freq].add(num);
    } else {
      groupByFreq[freq] = new Set().add(num);
    }
  }

  // as we are using an array to group by frequency, by default they are sorted in asc order
  const result = [];
  for (let i = groupByFreq.length - 1; i >= 0; i--) {
    if (groupByFreq[i]) {
      result.push(...groupByFreq[i]);
    }
    if (result.length === k) return result;
  }
};
testCases.forEach(testCase => console.log(topKFrequentV2(...testCase)));
