// Leetcode: https://leetcode.com/problems/number-of-provinces/description/

/**
 * @param {number[][]} isConnected
 * @return {number}
 */

// isConnected is a adjacency matrix
// Example: isConnected = [[1,0,0],[0,1,0],[0,0,1]]

// components: connected graph sections in the graph
// A-->B
// C
// this can be a graph and A->B is a component and C is a component
// and here we need to find those components(count)
var findCircleNum = function (isConnected) {
  // keep a set to track the visited nodes of the graph
  const visited = new Set(); // this can be an array of length isConnected.length as well
  let provinces = 0;

  const vertices = isConnected.length;

  const dfs = node => {
    if (visited.has(node)) return;
    visited.add(node);

    for (let j = 0; j < vertices; j++) {
      if (isConnected[node][j] === 1 && !visited.has(j)) {
        dfs(j);
      }
    }
  };

  for (let i = 0; i < vertices; i++) {
    // call dfs only if the node isnt visited yet
    // within the iteration, dfs will end when there's no further path to explore
    // increment the provinces when the dfs ended for that startNode and all its connected nodes were visited
    // and in the next iteration, we will check if the next node is already visited
    // if yes, skip and if not start dfs for that node
    // total count by the end of the iteration will be the count of components

    if (!visited.has(i)) {
      dfs(i);
      provinces++;
    }
  }

  return provinces;
};

console.log(
  'Provinces: ',
  findCircleNum(
    (isConnected = [
      [1, 1, 0],
      [1, 1, 0],
      [0, 0, 1],
    ])
  )
);

// Approach 02: We can use Disjoint Set to solve this problem.
// Check for each edge in the grid, if both nodes belong to the same component
// i.e, have same root parent node. if not, then union the two nodes.
// For each component: there will be a unique root node
// By the end, number of unique root/parent elements will be the count of components

class DisjointSet {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = new Array(n).fill(0);
  }

  findRootParent(i) {
    if (i === this.parent[i]) return i;
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

var findCircleNumV2 = isConnected => {
  const nodes = isConnected.length;
  const ds = new DisjointSet(nodes);

  for (let i = 0; i < nodes; i++) {
    for (let j = 0; j < nodes; j++) {
      if (
        ds.findRootParent(i) !== ds.findRootParent(j) &&
        isConnected[i][j] === 1
      ) {
        ds.unionByRank(i, j);
      }
    }
  }

  // count the unique root elements in the parent array
  return new Set(ds.parent).size;
};
