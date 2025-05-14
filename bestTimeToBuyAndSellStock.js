// leetcode: https://leetcode.com/problems/best-time-to-buy-and-sell-stock/description/

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  // Approach 01: consider the first element as currPrice
  // and start looping from 1st index element and check the profit & currPrice

  // if the currPrice is less than the initiated value, then update the currPrice
  // [ as we need to buy stock at least price to maximize the profit]

  // if not, then check if the currProfit > maxProfit : if yes update maxProfit

  let maxProfit = 0,
    buyPrice = prices[0];

  for (let i = 1; i < prices.length; i++) {
    const currProfit = prices[i] - buyPrice;

    if (prices[i] < buyPrice) {
      buyPrice = prices[i];
    } else if (currProfit > maxProfit) {
      maxProfit = currProfit;
    }
  }

  return maxProfit;

  // Approach 02: start with the 0th element and initialize the min cost as Infinity
  let maxProfit = 0,
    minCost = Infinity;
  for (let i = 0; i > prices.length; i++) {
    const profit = prices[i] - minCost;
    if (profit > maxProfit) {
      maxProfit = profit;
    } else if (prices[i] < minCost) {
      minCost = prices[i];
    }
  }

  return maxProfit;
};
