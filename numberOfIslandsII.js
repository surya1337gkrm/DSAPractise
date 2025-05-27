// Leetcode: https://leetcode.com/problems/number-of-islands-ii/
// Lintcode: https://www.lintcode.com/problem/434/description

class DisjointSet {
  constructor() {
    this.parent = {};
  }

  findRootParent(i) {
    if (!(i in this.parent)) {
      this.parent[i] = i;
    }
    if (i !== this.parent[i]) {
      this.parent[i] = this.findRootParent(this.parent[i]);
    }
    return this.parent[i];
  }

  unionByRank(u, v) {
    const rootU = this.findRootParent(u);
    const rootV = this.findRootParent(v);
    if (rootU !== rootV) {
      this.parent[rootV] = rootU;
    }
  }
}

const directions = [
  [-1, 0], //top
  [0, 1], //right
  [1, 0], //bottom
  [0, -1], //left
];
var numIslands2 = (n, m, operators) => {
  // Intution: As we need to calculate the number of islands(components) after each operation,
  // using Disjoint set is best for the use case as we group the cells for each operation
  // and we can keep track of number of islands using a count variable
  // when a new node should be marked as land - consider it as an isolated land cell and mark it
  // and increment the count variable. And, check if its neighbor cells are lands -
  // if yes, check if the neighbor cell and current cell share the same parent
  // if yes, we can skip it - if not, that means we can group these 2 cells
  // which reduces the component count by 1 as previously we considered this cell as an isolated component
  const visited = Array.from({ length: n }, () => new Array(m).fill(0));
  let count = 0; // to keep track of components
  const result = [];
  const ds = new DisjointSet();

  for (const [r, c] of operators) {
    // check if the cell is already visited
    // if visited, push the current count to the result array
    if (visited[r][c] === 1) {
      result.push(count);
      continue;
    }
    visited[r][c] = 1;
    count++; // if the cell isnt visited, consider the cell as an isolated island cell
    // now check if the neighbor cells are lands and if yes, also check if they have the same root parent
    // if yes, we can skip it - if not, that means we can group these 2 cells
    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < n && nc >= 0 && nc < m && visited[nr][nc] === 1) {
        // check if the neighbor cell and current cell share the same root parent
        const currNode = `r${r}c${c}`;
        const neighborNode = `r${nr}c${nc}`;
        // neighbor node is a land and then they dont have same parent, so we can group them
        // as we considered current node as an isolated island cell, now we have to decrement the count
        if (ds.findRootParent(currNode) !== ds.findRootParent(neighborNode)) {
          ds.unionByRank(currNode, neighborNode);
          count--;
        }
      }
    }
    result.push(count);
  }
  return result;
};

console.log(
  numIslands2(
    (n = 4),
    (m = 5),
    (A = [
      [1, 1],
      [0, 1],
      [3, 3],
      [3, 4],
    ])
  )
);
console.log(
  numIslands2(
    (n = 3),
    (m = 3),
    (A = [
      [0, 0],
      [0, 1],
      [2, 2],
      [2, 1],
    ])
  )
);
