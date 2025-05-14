// GFG: https://www.geeksforgeeks.org/problems/minimum-multiplications-to-reach-end/1

var minimumMultiplications = (arr, start, end) => {
  // we dont need PQ as we are pushing the elements as they were explored by steps
  const queue = [];
  //start = start % 100000;
  //end = end % 100000;
  queue.push([0, start]);

  const minStepsArr = new Array(end+1).fill(Infinity);
  minStepsArr[start] = 0;

  while (queue.length > 0) {
    const [steps, current] = queue.shift();
    if (current === end) {
      return steps;
    }

    for (const el of arr) {
      const product = (current * el) % 100000;
      if (product <= end) {
        if (steps + 1 < minStepsArr[product]) {
          minStepsArr[product] = steps + 1;
          queue.push([steps + 1, product]);
        }
      }
    }
  }

  return -1;
};
console.log(minimumMultiplications(arr = [2, 5, 7],start = 3, end = 30))
console.log(minimumMultiplications(arr= [3, 4, 65],start = 7, end = 66175))