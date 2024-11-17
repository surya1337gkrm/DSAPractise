// GeeksForGeeks: https://www.geeksforgeeks.org/problems/second-largest3735/1

class Solution {
    // Function returns the second largest element
    getSecondLargest(arr) {
        // first & second to store first largest and second largest element
        let first=-Infinity, second=-Infinity
        for(let val of arr){
            // if the value of element is greater than the first and second element
            // transfer first value to second and then update the first value with the current value
            if(val > first && val>second){
                second=first
                first=val
            }else if(val<first && val>second){
                // we dont consider the same values as second largest element should be distinct value
                second=val
            }
        }
        // return -1 if second largest isnt found
        return second===-Infinity ? -1 : second
    }
}