// Leetcode: https://leetcode.com/problems/critical-connections-in-a-network/description/

// Bridge (or) Critical connection: is an edge in a graph which is when removed, increases the number of components in the graph
/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number[][]}
 */
var criticalConnections = function (n, connections) {
  // Approach: We use Tarjan's bridges algorithm to detect the bridges in the graph

  // Perform a DFS and tracking two timestamps for each node:
  // the time it was first visited (insertionTime) and the lowest time reachable from its subtree (lowestTime).
  // During DFS, for each unvisited neighbor, we recurse and update lowestTime after returning;
  // for visited neighbors (excluding the parent), we update lowestTime via back edges.
  // An edge (u, v) is a bridge if lowestTime[v] > insertionTime[u], meaning v and its subtree cannot reach u
  // or its ancestors, so removing (u, v) would disconnect the graph.

  // step 01: construct the graph
  const graph = new Map();
  for (const [u, v] of connections) {
    if (!graph.has(u)) graph.set(u, []);
    if (!graph.has(v)) graph.set(v, []);
    graph.get(u).push(v);
    graph.get(v).push(u);
  }

  const insertionTime = new Array(n).fill(0); // used to track the insertion time of each node when the node is first explored
  const lowTime = new Array(n).fill(0); // used to track the minimum timestamp reachable from the node (could be from back-edges)
  const visited = new Array(n).fill(false); // used to track the visited nodes of the graph
  const bridges = []; // uses this list to store the bridges

  let timer = 1;

  const dfs = (node, parent) => {
    visited[node] = true;
    insertionTime[node] = timer;
    lowTime[node] = timer;
    timer++;

    for (const neighbor of graph.get(node) || []) {
      // check if the neighbor for the current node is the parent node, if yes, SKIP
      if (neighbor === parent) continue;
      // now, if the neighbor node isnt visited, we need to perform DFS on the neighbor node and update the lowestTime
      if (!visited[neighbor]) {
        dfs(neighbor, node);
        // once the dfs ends, update the lowest time for the current node
        lowTime[node] = Math.min(lowTime[node], lowTime[neighbor]); // we dont consider the parent's lowTime value
        // now check if the current node and neighbor node edge can be a bridge
        if (lowTime[neighbor] > insertionTime[node]) {
          bridges.push([node, neighbor]);
        }
      } else {
        // if the current node is already visited, update the lowest time for the current node
        lowTime[node] = Math.min(lowTime[node], lowTime[neighbor]); // we dont consider the parent's lowTime value
      }
    }
  };

  // start from 0th node
  dfs(0, -1);
  return bridges;
};

console.log(
  criticalConnections(
    (n = 4),
    (connections = [
      [0, 1],
      [1, 2],
      [2, 0],
      [1, 3],
    ])
  )
);
console.log(criticalConnections((n = 2), (connections = [[0, 1]])));
