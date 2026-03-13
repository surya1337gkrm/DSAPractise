// Leetcode: https://leetcode.com/problems/koko-eating-bananas/description/

/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var minEatingSpeed = function (piles, h) {
  // Intution: we need to find the minimum k bananas per hour so that within the given h,
  // koko will be able to finish all the bananas in the pile.
  // We have to determine the range of k bananas per hour, which is from 1 to the maximum number of bananas in a pile.
  // Why?: maximum value of k can the maximum of the pile. We dont have to choose a value >k as there are no piles with
  // bananas > max value in the pile. So the k lies between 1 to max of the pile
  // and then use binary search on this range to find the min k value

  let l = 1,
    r = Math.max(...piles);
  // helper function to determine if the k value is valid
  // i.e if koko can complete all the bananas in the given h
  // based on the k value.
  const isValid = k => {
    let hours = 0;
    for (let pile of piles) {
      // Why?: prbm statement mentioned if pile<k, koko will not move to the next pile until the next hour
      hours += Math.ceil(pile / k);
      if (hours > h) return false;
    }
    return true;
  };

  while (l <= r) {
    const mid = l + Math.floor((r - l) / 2);
    if (isValid(mid)) {
      // current mid is valid, so check if we can choose a k value < mid
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }
  return l;
};

const testCases = [
  [[3, 6, 7, 11], 8],
  [[30, 11, 23, 4, 20], 5],
  [[30, 11, 23, 4, 20], 6],
];

testCases.forEach(testCase => console.log(minEatingSpeed(...testCase)));
