// leetcode: https://leetcode.com/problems/two-sum/

// Assumption: There will be exactly one solution

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // use a map to store the taregt-currNum and currNUm index
    // in iteration, check if the currNUm exists in the map
    // if exists in the map, return [map[nums[i]],i]

    const map = {}
    for(let i=0;i<nums.length;i++) {
        // specifically check for undefined as 0 is a valid value in the map
        if(map[nums[i]]===undefined){
            map[target-nums[i]]=i
        }else{
            return [map[nums[i]],i]
        }
    }
}