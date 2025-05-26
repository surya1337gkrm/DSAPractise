// Leetcode: https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/description/

// Intution: we can remove stones in a row or column if they are in the same row or column.
// we have to find how many components(stones connected in a row/column)
// and we have to remove all stones(nodes) in except one in each component
// so totalStones-number of components = total stones that can be removed.

/**
 * @param {number[][]} stones
 * @return {number}
 */
var removeStones = function (stones) {
  let components = 0;
  // to keep track of which stone is visited/removed.
  const visited = new Set();

  const dfs = node => {
    visited.add(node);
    const [row, col] = stones[node]; // get the row and column of the current stone
    // check all stones in the given array if they lie in same row/column
    // stone with same row/column means it belongs to the same component
    for (let neighbor = 0; neighbor < stones.length; neighbor++) {
      if (!visited.has(neighbor)) {
        const [nextRow, nextCol] = stones[neighbor];
        if (row === nextRow || col === nextCol) {
          dfs(neighbor);
        }
      }
    }
  };

  // simillar to counting components in a graph
  // mark stone i as visited and start dfs from that stone
  for (let i = 0; i < stones.length; i++) {
    if (!visited.has(i)) {
      dfs(i);
      components++;
    }
  }

  return stones.length - components;
};

console.log(
  removeStones(
    (stones = [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 2],
      [2, 1],
      [2, 2],
    ])
  )
);

console.log(
  removeStones(
    (stones = [
      [0, 0],
      [0, 2],
      [1, 1],
      [2, 0],
      [2, 2],
    ])
  )
);

console.log(removeStones((stones = [[0, 0]])));
console.log('--------------------');
class DisjointSet {
  // as we dont know how many edges
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = new Array(n).fill(0);
  }

  findRootParent(i) {
    if (this.parent[i] !== i) {
      this.parent[i] = this.findRootParent(this.parent[i]);
    }
    return this.parent[i];
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
var removeStonesV2 = function (stones) {
  // Approach 02: Using disjoint set with fixed length array
  // based on the problem statement and constraints, maximum rows and columns can be 10_000
  // so initiate an array with 20_000 length
  // so row can be used as it is and for olumn numbers to be unique, we will add 10_001 to the given col num
  const ds = new DisjointSet(20_000);
  // iterate through the stones array and connect stones with same row or column
  // initially, for each index, parent is itself - connect x,y of the cell and then
  // next cell with same row/cell will be connected - forming an edge.
  // Example: (0,1) will be connected with 0 as 1(10002)'s parent and when (1,2) is added,
  // 1's parent will be updated to 0 and 2(10003)'s parent will be updated to 0.

  for (const [r, c] of stones) {
    ds.unionByRank(r, c + 10_001);
  }

  // count the number of components
  const roots = new Set();
  // iterate through the stones array and add the roots to the set
  // the number of components will be the size of the set
  for (const [r, c] of stones) {
    roots.add(ds.findRootParent(r));
  }

  return stones.length - roots.size;
};
console.log(
  removeStonesV2(
    (stones = [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 2],
      [2, 1],
      [2, 2],
    ])
  )
);

console.log(
  removeStonesV2(
    (stones = [
      [0, 0],
      [0, 2],
      [1, 1],
      [2, 0],
      [2, 2],
    ])
  )
);

console.log(removeStonesV2((stones = [[0, 0]])));
console.log('--------------------');

// Problem with Approach 02:
// We are using fixed length array which is not efficient for large number of rows and columns.
// and also becuase at max there can be only 1000 stones(as per problem statement) we will not
// fill maximum size of the array wasting the space.
// with slight modifications to the Disjoint set, we can just store the parent of each node in the array.
// This will make the approach more efficient for large number of rows and columns.

class DisjointSetV2 {
  constructor() {
    this.parent = {};
    this.rank = {};
  }
  findRootParent(i) {
    // check if i exists in the parent object as a key
    // if not add a new element in the object
    if (!(i in this.parent)) {
      this.parent[i] = i;
      this.rank[i] = 0;
    }
    if (this.parent[i] !== i) {
      this.parent[i] = this.findRootParent(this.parent[i]);
    }
    return this.parent[i];
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

// Most optimal solution
const removeStonesV3 = function (stones) {
  // we need to create edges between the cells and just like as in the previous approach
  // we start with grouping row and col of the stone and connect them if they are in the same row or column.
  // and as we are using a amp to keep track of parents, keys we use should be unique
  // and also keep track of unique rows/cols that we explored
  const nodes = new Set();
  const ds = new DisjointSetV2();
  for (const [r, c] of stones) {
    const row = `r${r}`;
    const col = `c${c}`;
    ds.unionByRank(row, col); // establishing edges
    nodes.add(row);
    nodes.add(col);
  }

  // now edges has been estbalished and we have the components
  // we need to count the components i.e, unique roots
  // we just to explore the nodes and add the roots to the set
  // using a nodes set will help us in avoiding checking parent for the same row/col multiple times
  const roots = new Set();
  for (const node of nodes) {
    roots.add(ds.findRootParent(node));
  }
  return stones.length - roots.size;
};

console.log(
  removeStonesV3(
    (stones = [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 2],
      [2, 1],
      [2, 2],
    ])
  )
);

console.log(
  removeStonesV3(
    (stones = [
      [0, 0],
      [0, 2],
      [1, 1],
      [2, 0],
      [2, 2],
    ])
  )
);

console.log(removeStonesV3((stones = [[0, 0]])));
