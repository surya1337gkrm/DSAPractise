// geeksforgeeks: https://www.geeksforgeeks.org/problems/largest-element-in-array4009/0

class Solution {
    /**
    * @param number[] arr

    * @returns number
    */
    largest(arr) {
        // code here
        let largest = -Infinity
        for(let val of arr){
            if(val>largest){
                largest=val
            }
        }
        
        return largest
    }
}