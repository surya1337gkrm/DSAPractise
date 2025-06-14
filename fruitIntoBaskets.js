// Leetcode: https://leetcode.com/problems/fruit-into-baskets/

/**
 * @param {number[]} fruits
 * @return {number}
 */
var totalFruit = function (fruits) {
  // Approach 01: Bruteforce - look for all subsets of the array and check if the subarray has
  // only 2 types of fruits - if there are >2 fruit types, skip the subarray and move to the next subarray
  // TC: O(n^2) approx.
  // Might get a TLE Error.

  let max = 0;
  for (let i = 0; i < fruits.length; i++) {
    const set = new Set();
    for (let j = i; j < fruits.length; j++) {
      set.add(fruits[j]);
      if (set.size > 2) break; // skip the subarray if >2 fruit types exists
      // if not, update the max length of the subarray
      max = Math.max(max, j - i + 1);
    }
  }
  return max;
};
console.log(totalFruit((fruits = [1, 2, 1])));
console.log(totalFruit((fruits = [0, 1, 2, 2])));
console.log(totalFruit((fruits = [1, 2, 3, 2, 2])));

// Approach 02: Bruteforce approach results in a TLE error and TC will be O(n^2)
// a better approach would be using a 2 pointer & sliding window approach.
// start with left & right pointers pointing to the first element of the array
// Use a map to store unique fruit types and the count.
// Insert the right pointer element into the map and increment the count and when map has >2 unique keys
// then shift the left pointer until map has only 2 unique keys(reduce the count of l pointer element and if 0, remove the element)
// update the max length of the subarray

var totalFruitV2 = function (fruits) {
  let l = 0,
    r = 0,
    max = 0;
  let map = new Map();

  while (r < fruits.length) {
    // check if map has the current fruit type, if yes increment the count value
    // else add the fruit type as key and initiate count value as 1
    map.set(fruits[r], (map.get(fruits[r]) || 0) + 1);
    while (map.size > 2) {
      map.set(fruits[l], map.get(fruits[l]) - 1);
      if (map.get(fruits[l]) === 0) map.delete(fruits[l]);
      l++;
    }

    max = Math.max(max, r - l + 1);
    r++;
  }
  return max;
};
console.log(totalFruitV2((fruits = [1, 2, 1])));
console.log(totalFruitV2((fruits = [0, 1, 2, 2])));
console.log(totalFruitV2((fruits = [1, 2, 3, 2, 2])));


// Approach 03: Slightly better approach than V2
// we used map to store unique fruit types and the count.
// whenever map size>2, we are using a inner while loop which adds a little to the tc
// i.e, r takes n steps and whenever max size>2, l takes few steps until max size<=2 
// at the worse case, l has to take n-1 steps as well adding O(n) to the tc
// Overall TC: O(2N)
// To reduce this, we can only shrink the window only once when max size>2
var totalFruitV3 = function (fruits) {
  let l = 0,
    r = 0,
    max = 0;
  let map = new Map();

  while (r < fruits.length) {
    // check if map has the current fruit type, if yes increment the count value
    // else add the fruit type as key and initiate count value as 1
    map.set(fruits[r], (map.get(fruits[r]) || 0) + 1);
    if (map.size > 2) {
      map.set(fruits[l], map.get(fruits[l]) - 1);
      if (map.get(fruits[l]) === 0) map.delete(fruits[l]);
      l++;
    }

    max = Math.max(max, r - l + 1);
    r++;
  }
  return max;
};
console.log(totalFruitV3((fruits = [1, 2, 1])));
console.log(totalFruitV3((fruits = [0, 1, 2, 2])));
console.log(totalFruitV3((fruits = [1, 2, 3, 2, 2])));