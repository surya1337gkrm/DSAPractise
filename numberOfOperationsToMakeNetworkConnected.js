// Leetcode: https://leetcode.com/problems/number-of-operations-to-make-network-connected/
/**
 * @param {number} n
 * @param {number[][]} connections
 * @return {number}
 */

// if there are n components, we need atleast n-1 edges to make these components connected.
// Example: a->b | c->d | e->f are 3 components
// we need atleast 2 edges to connect these 3 components.
// but based on the problem statement, we can add these edges only if there are extra edges in the
// given graph and only return minimal edges required when there are enough enough extra edges that
// can be removed and shifted to connect these components.

// Approach 01: Using DFS to find the number of connected components in the graph
let makeConnected = function (n, connections) {
  // base conditions: for n vertices, we need atleast n-1 edges to make the graph completely connected.
  // return early if the number of edges is less than the minimum required edges.
  if (connections.length < n - 1) return -1;

  const visited = new Array(n).fill(false);
  let components = 0;
  let extraEdges = 0;

  // construct the graph
  const graph = new Map();
  for (const [u, v] of connections) {
    if (!graph.has(u)) graph.set(u, []);
    if (!graph.has(v)) graph.set(v, []);
    graph.get(u).push(v);
    graph.get(v).push(u);
  }

  const dfs = (node, parent) => {
    visited[node] = true;
    for (const neighbor of graph.get(node) || []) {
      if (!visited[neighbor]) {
        dfs(neighbor, node); // continue dfs for the neighbor node and previous node as the new parent node
      } else if (parent !== neighbor) {
        // because the given graph is a undirected graph a->b and b->a is considered as a single edge
        // so, this node is already visited and it is not the parent node, it means there is a cycle in the graph
        // as this is a undirected graph, so each edge will be counted twice.
        extraEdges++; // increment the extra edges count
      }
    }
  };

  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      dfs(i, -1); // use -1 as parent node when the dfs is started
      components++;
    }
  }

  // return the minimum edges required to make the graph connected only if
  // the number of extra edges is less than or equal to the number of components - 1
  // as each edge will be counted twice, so we need to divide the extra edges by 2
  return Math.floor(extraEdges / 2) >= components - 1 ? components - 1 : -1;
};

console.log(
  makeConnected(
    (n = 4),
    (connections = [
      [0, 1],
      [0, 2],
      [1, 2],
    ])
  )
);
console.log(
  makeConnected(
    (n = 6),
    (connections = [
      [0, 1],
      [0, 2],
      [0, 3],
      [1, 2],
      [1, 3],
    ])
  )
);
console.log(
  makeConnected(
    (n = 6),
    (connections = [
      [0, 1],
      [0, 2],
      [0, 3],
      [1, 2],
    ])
  )
);

// Approach 02: Using Disjoint set - Better approach compared to using DFS approach
// as finding root parent and union is almost constant time - and also, we dont have
// to create a graph which saves additional space we use for storing the graph.
class DisjointSet {
  constructor(n) {
    this.parent = Array.from({ length: n }, (v, i) => i);
    this.rank = new Array(n).fill(0);
  }

  findRootParent(i) {
    if (this.parent[i] === i) return i;
    const parent = this.findRootParent(this.parent[i]);
    this.parent[i] = parent;
    return parent;
  }

  unionByRank(u, v) {
    const rootU = this.findRootParent(u);
    const rootV = this.findRootParent(v);
    if (rootU === rootV) return;
    if (this.rank[rootU] < this.rank[rootV]) {
      this.parent[rootU] = rootV;
    } else if (this.rank[rootV] < this.rank[rootU]) {
      this.parent[rootV] = rootU;
    } else {
      this.parent[rootV] = rootU;
      this.rank[rootU]++;
    }
  }
}
let makeConnectedV2 = function (n, connections) {
  // base conditions: for n vertices, we need atleast n-1 edges to make the graph completely connected.
  // return early if the number of edges is less than the minimum required edges.
  if (connections.length < n - 1) return -1;

  const ds = new DisjointSet(n);
  let extraEdges = 0;

  for (const [u, v] of connections) {
    if (ds.findRootParent(u) !== ds.findRootParent(v)) {
      ds.unionByRank(u, v);
    } else {
      // if the u,v already belongs to the same component, that means this edge between u-v is extra
      // so, increment the extra edges count
      extraEdges++;
    }
  }

  // we need to call findRootParent for all nodes in the graph to get the updated parent
  // as we are using unionByRank, the parent of a node can change after union operation
  // and some nodes parent info can be stale if we dont call findRootParent for all nodes
  // for example [[0,1],[0,2],[3,4],[2,3]] after [3,4] 4 parent will be 3 and parent for 3 will be 3
  // and for [2,3] 3 parent will be updated to 2 but 4 parent will not be updated.
  // so, in order to avoid stale parent info, update parent for all nodes
  for (let i = 0; i < n; i++) {
    ds.findRootParent(i);
  }
  const components = new Set(ds.parent).size;

  // return the minimum edges required to make the graph connected only if there are enough edges
  return extraEdges >= components - 1 ? components - 1 : -1;
};

console.log(
  makeConnectedV2(
    (n = 4),
    (connections = [
      [0, 1],
      [0, 2],
      [1, 2],
    ])
  )
);
console.log(
  makeConnectedV2(
    (n = 6),
    (connections = [
      [0, 1],
      [0, 2],
      [0, 3],
      [1, 2],
      [1, 3],
    ])
  )
);
console.log(
  makeConnectedV2(
    (n = 6),
    (connections = [
      [0, 1],
      [0, 2],
      [0, 3],
      [1, 2],
    ])
  )
);

// To make this better: we can define the parent and rank array within the function and define helper
// functions within the functions so that data access eill be easier and less prone to errors.
