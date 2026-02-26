// [ Easy ] Leetcode: https://leetcode.com/problems/two-sum/description/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const testCases = [
  [[2, 7, 11, 15], 9],
  [[3, 2, 4], 6],
  [[3, 3], 6],
];
var twoSum = function (nums, target) {
  // Approach: Iterate through the numbers array and for each number,
  // add the current number index as value & target-(current number) as key
  // if the key exists in the map, return the value & current number index
  // Example: nums=[2,7,8] target=9
  // index=0,num=2 target-currNum=9-2=7 at Index 0 {2:0}
  // so next num 7, we check for 9-7=2 in the map, it exists so return [0,1]
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (map.has(target - nums[i])) return [map.get(target - nums[i]), i];
    else {
      map.set(nums[i], i);
    }
  }
};

testCases.forEach(testCase => console.log(twoSum(...testCase)));