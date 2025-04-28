// Leetcode: https://leetcode.com/problems/course-schedule-ii/description/

// we can just use the same approach we used in the courseSchedule.js
// if dfs is used, use topological sort and push the node to the stack and at last return the reverse stack
// for bfs just return the topoSort array

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function (numCourses, prerequisites) {
  const graph = new Map();
  const inDegree = new Array(numCourses).fill(0);
  for (const [a, b] of prerequisites) {
    if (!graph.has(a)) graph.set(a, []);
    if (!graph.has(b)) graph.set(b, []);

    graph.get(b).push(a); // a has dependency on b so b->a
    inDegree[a]++; // a has incoming edge
  }

  const queue = [];
  const topoSort = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  while (queue.length > 0) {
    const node = queue.shift();
    topoSort.push(node);
    for (const neighbor of graph.get(node) || []) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) queue.push(neighbor);
    }
  }

  return topoSort.length === numCourses ? topoSort : [];
};

console.log(findOrder((numCourses = 2), (prerequisites = [[1, 0]])));
console.log(
  findOrder(
    (numCourses = 4),
    (prerequisites = [
      [1, 0],
      [2, 0],
      [3, 1],
      [3, 2],
    ])
  )
);

console.log(findOrder((numCourses = 1), (prerequisites = [])));
