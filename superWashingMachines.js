// leetcode: https://leetcode.com/problems/super-washing-machines/

/**
 * @param {number[]} machines
 * @return {number}
 */
var findMinMoves = function (machines) {
  // early return: if the total sum of all dresses isnt divisible by
  // the number of machines(length of array), balancing the array isnt possible

  let totalSum = 0;
  for (let dresses of machines) {
    totalSum += dresses;
  }

  if (totalSum % machines.length !== 0) return -1;

  // calculate the target dresses in each machines
  const target = totalSum / machines.length;
  let balance = 0,
    moves = 0,
    diff;
  for (let dresses of machines) {
    // calculate the difference of dresses in each machine
    // and update the balance [ used to track how many dresses need to be moved]
    // if diff is +ve, dresses need to be moved
    // if diff is -ve, this machine has deficit so need dresses
    diff = dresses - target;
    balance += diff; // total number of deficit/surplus

    // update the moves required at this point to reach the target
    moves = Math.max(moves, Math.abs(balance), diff);
  }

  return moves;
};
