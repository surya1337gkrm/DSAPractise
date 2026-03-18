// Leetcode: https://leetcode.com/problems/time-based-key-value-store/

var TimeMap = function () {
  // Approach: Use a map to store the key-value pairs and each key will
  // have a array of timestamps and values.
  // Example: {'foo':[['bar1',1],['bar2',2],['bar3',3]]}
  this.map = new Map();
};

/**
 * @param {string} key
 * @param {string} value
 * @param {number} timestamp
 * @return {void}
 */
TimeMap.prototype.set = function (key, value, timestamp) {
  // if the key doesnt exist, set a key and empty list
  if (!this.map.has(key)) {
    this.map.set(key, []);
  }
  // push the timestamp and value to the list of the key
  // we can either use a map or array to store the timestamp & value
  // if array, lookup will be faster than using a map
  this.map.get(key).push({ timestamp, value });
};

/**
 * @param {string} key
 * @param {number} timestamp
 * @return {string}
 */
TimeMap.prototype.get = function (key, timestamp) {
  // Base conditions: if the key doesnt exist return ""
  // Simillarly, if the timestamp is less than the first timestamp in the array
  // (as given in the problem, inserting timestamps will be only increasing...) return ""
  if (!this.map.has(key)) return '';
  const values = this.map.get(key);
  if (timestamp < values[0].timestamp) return '';

  // now we can use binary search to get the value equal(or) closer to the given timestamp
  let l = 0,
    r = values.length - 1;
  while (l <= r) {
    const mid = l + Math.floor((r - l) / 2);
    const currTimestamp = values[mid].timestamp;
    if (currTimestamp === timestamp) return values[mid].value;
    else if (currTimestamp > timestamp) {
      // we have to shrink the search space to the left half
      r = mid - 1;
    } else {
      // we have to shrink the search space to the right half
      l = mid + 1;
    }
  }
  return values[r].value;
};

// testing
const map = new TimeMap()
map.set('foo', 'bar1', 1)
map.set('foo', 'bar2', 2)
map.set('foo', 'bar3', 3)
console.log(map.get('foo', 1)) // "bar1"
console.log(map.get('foo', 3)) // "bar3"
console.log(map.get('foo', 4)) 
console.log(map.get('foo', 2)) // "bar2"
console.log(map.get('foo1'))
console.log(map.get('foo', 0))