// Leetcode: https://leetcode.com/problems/best-time-to-buy-and-sell-stock/description/

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    // Approach: Use 2 pointers
    // start with first two elements and check the profit.
    // if the profit is negative, then move the left pointer to the right
    let l=0,r=1,maxProfit=0;
    while(r<prices.length){
        if(prices[l]<prices[r]){
            maxProfit=Math.max(maxProfit,prices[r]-prices[l]);
        } else {
            // if the profit is negative, then move the left pointer to the right
            l=r; 
        }
        r++;
    }
    return maxProfit
}