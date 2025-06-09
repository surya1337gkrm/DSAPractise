// Leetcode: https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/description/

/**
 * @param {number[]} cardPoints
 * @param {number} k
 * @return {number}
 */
var maxScore = function (cardPoints, k) {
  // as we are supposed to choose k cards combinedly from start or end of the array,
  // i.e, if k=3, we can choose one card from start and 2 from last.
  // Approach: Start with choosing the first k cards from the array and calculate the total points
  // and now, start removing the last card from front and add the last card from last end to the total points
  // and check if this sum is greater, if yes update the result. continue this until k cards from the last is selected

  // Two pointer & sliding
  let sum = 0;
  let n = cardPoints.length;

  // total sum of first k cards
  for (let i = 0; i < k; i++) {
    sum += cardPoints[i];
  }

  // Step 02: now, start removing the last card from front and add the last card from last end to the total points
  let res = sum;
  let j = n - 1;
  for (let i = k - 1; i >= 0; i--) {
    // remove the last card from front and add the last card from last end to the total points
    sum = sum - cardPoints[i] + cardPoints[j];
    j--; // decrement j to add the last card from last end to the total points in the next iteration
    res = Math.max(res, sum); // update the result if the current sum is greater
  }

  return res;
};

console.log(maxScore((cardPoints = [1, 2, 3, 4, 5, 6, 1]), (k = 3)));
console.log(maxScore((cardPoints = [2, 2, 2]), (k = 2)));
console.log(maxScore((cardPoints = [9, 7, 7, 9, 7, 7, 9]), (k = 7)));
