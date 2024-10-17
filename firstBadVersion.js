// leetcode: https://leetcode.com/problems/first-bad-version/description/

/**
 * Definition for isBadVersion()
 * 
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function(isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    return function(n) {
        // As the versions are sorted, we can use binary search approach
        // starts with 1 and ends with n
        let left=1,right=n,mid
        while(left<=right){
            mid=left+Math.floor((right-left)/2)
            if(isBadVersion(mid)){
                // if mid is bad, then we have to check if mid-1 is bad
                // if mid-1 is bad that means mid isnt the first bad version
                // so update right to mid-1. if mid-1 is not bad, then mid is the first bad version
                // else left = mid+1

                if(isBadVersion(mid)){
                    if(!isBadVersion(mid-1)) return mid
                    else right=mid-1
                }else{
                    left=mid+1
                }
            }
        }



        // approach 02: reduce the API calls from 2 per each iteration to 1
        // let left=1,right=n,mid
        // while(left<right){
        //     mid=left+Math.floor((right-left)/2)
        //     if(isBadVersion(mid)){
        //         right=mid
        //     }else{
        //         left=mid+1
        //     }
        // }
        // return left
    }
}