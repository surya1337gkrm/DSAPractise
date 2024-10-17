// leetcode: https://leetcode.com/problems/binary-search/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    // initialize left and right pointers and calculate mid point in each iteration
    // terminate when l<=r
    // if mid val < target l=mid+1 [ as any value in l to mid range will be less than the target: 
    // so no point in searching this range]
    // else r-- [ //ly r=mid-1]

    let l=0,r=nums.length-1,mid

    while(l<=r){
        mid = l+Math.floor((r-l)/2)
        if(nums[mid]===target) return mid
        else if(nums[mid]<target){
            l=mid+1
        }else{
            r=mid-1
        }
    }

    // return -1 if not found
    return -1
}