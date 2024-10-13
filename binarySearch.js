// leetcode: https://leetcode.com/problems/binary-search/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    // initialize left and right pointers and calculate mid point in each iteration
    // terminate when l<=r
    // if mid val < target l++
    // else r--

    let l=0,r=nums.length-1

    while(l<=r){
        const mid = l+Math.floor((r-l)/2)
        if(nums[mid]===target) return mid
        else if(nums[mid]<target){
            l++
        }else{
            r--
        }
    }

    // return -1 if not found
    return -1
}