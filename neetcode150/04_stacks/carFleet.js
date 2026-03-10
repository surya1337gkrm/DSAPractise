// Leetcode: https://leetcode.com/problems/car-fleet/description/

/**
 * @param {number} target
 * @param {number[]} position
 * @param {number[]} speed
 * @return {number}
 */

const testCases = [
  [12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3]],
  [10, [3], [3]],
  [100, [0, 2, 4], [4, 2, 1]],
];
var carFleet = function (target, position, speed) {
  // Intution: we need to find the number of car fleets that can be formed
  // In order to calculate the total fleets, its better if we start with the car thats closest to the target
  // as the problem mentioned all the cars are moving in a single lane and no car can overtake other cars
  // so the car closer to the target will determine the number of fleets.

  // consider car position of the car on x axis and speed on y axis
  // slope(or) line for car is the time taken and no of fleets will be determined based on when these cars intersect
  // as from the point of intersection cars move together as a fleet with least speed of the fleet

  // Approach: As the car closer to the target determines the fleet number, group the position & speed
  // and sort the array based on the position of the car(descending order - closer to the target)

  // then for each car, calculate the time taken to reach the target
  // and if the time taken is less than the time taken by the next car,
  // then it means the next car will be part of the same fleet as the current car
  // else it will be a separate fleet

  const cars = [];
  for (let i = 0; i < speed.length; i++) {
    cars.push([position[i], speed[i]]);
  }

  cars.sort((a, b) => b[0] - a[0]);

  // using a stack to store the time taken to reach the target
  const stack = [];
  for (let [p, s] of cars) {
    const time = (target - p) / s;
    // only push the time if the time taken is greater than the time taken by the next car
    // as the next car will be part of the same fleet as the current car
    // else it will be a separate fleet
    if (!stack.length || time > stack[stack.length - 1]) {
      stack.push(time);
    }
  }
  return stack.length;
  //------------------------------------------------------------------
  // as we are not popping anything from the stack, 
  // we can just use a variable to keep track of the previous time
  // and compare it with the current time
  // Without a stack
  let prevTime = 0,
    fleets = 0;
  for (let [p, s] of cars) {
    const time = (target - p) / s;
    if (time > prevTime) {
      prevTime = time;
      fleets++;
    }
  }
  return fleets;
};

testCases.forEach(testCase => console.log(carFleet(...testCase)));
