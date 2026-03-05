// Leetcode: https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/description/

/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
    // Approach: use two pointers, one at the start of the array and one at the end of the array
    // if the sum of the two pointers is equal to the target, return the indices of the two pointers
    // Problem statement: the array is 1 indexed, so we need to return the indices of the two pointers + 1
    let l = 0, r = numbers.length - 1;
    while (l < r) {
        const sum = numbers[l] + numbers[r];
        if (sum === target) return [l + 1, r + 1];
        else if (sum < target) l++;
        else r--;
    }
}