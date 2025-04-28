// Leetcode: https://leetcode.com/problems/course-schedule/description/

// We can solve this in two approaches: BFS(Kahn's algorithm for topological sort) and DFS(Finding cydle in Directed graph)

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) {
  // this is simillar to the topological sort
  // each course has a prerequisite: if a has to be taken, b has to be completed a->b
  // Approach 01: Using DFS
  // construct the graph and the visited array[0:unvisited,1:visited,2:completed]
  const graph = new Map();
  const visited = new Array(numCourses).fill(0);

  for (const [a, b] of prerequisites) {
    if (!graph.has(a)) graph.set(a, []);
    if (!graph.has(b)) graph.set(b, []);

    graph.get(b).push(a); // [a,b] b has to be taken in order to take a so its b->a (a has a dependency on b)
  }

  // takes each node and check if its already visited
  // if a node is already visited, then it means there's a cycle in the graph
  // and if the node exploration is completed(all neighbors visited), then we can skip
  const dfs = (node) => {
    if (visited[node] === 1) return true;
    if (visited[node] === 2) return false;

    visited[node] = 1;
    for (const neighbor of graph.get(node) || []) {
      if (dfs(neighbor)) return true;
    }
    // if there arent any cycle and all neighbors of a node explored, then mark the node as completed
    visited[node] = 2;
    return false;
  };

  // now start dfs for each node in the graph
  for (let i = 0; i < numCourses; i++) {
    // if the specific course isnt visited, perform dfs
    if (visited[i] === 0) {
      // dfs fn will check if there's a cycle - if there's a cycle that means the courses cant be finished
      if (dfs(i) === true) return false;
    }
  }

  return true; // if there arent any cycles, courses can be finished
};

console.log(canFinish((numCourses = 2), (prerequisites = [[1, 0]])));
console.log(
  canFinish(
    (numCourses = 2),
    (prerequisites = [
      [1, 0],
      [0, 1],
    ])
  )
);

// Approach 02: Use Kahn's Algorithm for topological sort(BFS)
// construct the graph and inDegree array
var canFinish_withBFS = (numCourses, prerequisites) => {
  const graph = new Map();
  const inDegree = new Array(numCourses).fill(0);
  for (const [a, b] of prerequisites) {
    if (!graph.has(a)) graph.set(a, []);
    if (!graph.has(b)) graph.set(b, []);

    graph.get(b).push(a); // a has dependency on  b | b->a 
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
  // if the toplogical sort length is same as the number of courses, that means there is no cycle
  // so we can finish all the courses
  return topoSort.length === numCourses;
};

console.log(
  'With BFS:',
  canFinish_withBFS((numCourses = 2), (prerequisites = [[1, 0]]))
);
console.log(
  'With BFS:',
  canFinish_withBFS(
    (numCourses = 2),
    (prerequisites = [
      [1, 0],
      [0, 1],
    ])
  )
);
