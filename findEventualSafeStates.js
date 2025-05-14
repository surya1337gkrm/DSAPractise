// Leetcode: https://leetcode.com/problems/find-eventual-safe-states/

/**
 * @param {number[][]} graph
 * @return {number[]}
 */
var eventualSafeNodes = function (graph) {
  // find the nodes which doesnt have outgoing nodes/ nodes which leads to nodes with outDegree=0
  // Apporoach: Use cycle detection in a directed graph approach
  // if the all the children nodes of a node are visited without detecting a cycle - this node is a safe node.
  const n = graph.length;
  const visited = new Array(graph.length).fill(0);
  const safeNodes = [];

  const isSafe = node => {
    // a node is considered safe when all its children nodes are visited without detecting a cycle
    if (visited[node] === 1) return false;
    if (visited[node] === 2) return true; // if all child nodes are visited

    visited[node] = 1;

    for (let neighbor of graph[node]) {
      if (!isSafe(neighbor)) {
        return false;
      }
    }
    visited[node] = 2;
    return true;
  };

  for (let i = 0; i < n; i++) {
    // we can either call dfs only if the node isnt visited but in that case we have to push the
    // nodes to the safeNodes array in the dfs fn and this can be in any order - so later we have to sort the array
    // if(visited[i]===0){
    //     isSafe(i)
    // }
    // or if we call dfs sequentially for all nodes and handle pushing to safeNodes based of dfs return value
    // all the values will be in sorted order by default.
    if (isSafe(i)) safeNodes.push(i);
  }

  return safeNodes;
};

console.log(
  eventualSafeNodes((graph = [[1, 2], [2, 3], [5], [0], [5], [], []]))
);
console.log(
  eventualSafeNodes((graph = [[1, 2, 3, 4], [1, 2], [3, 4], [0, 4], []]))
);
