// leetcode: https://leetcode.com/problems/making-a-large-island/description/

/**
 * @param {number[][]} grid
 * @return {number}
 */

class DisjointSet {
  constructor(n) {
    // using an object and a string to represent a cell is inefficient compared to storing in an array
    // so we will use an array to store the cell values
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.size = new Array(n).fill(1); // preferring size over rank as we will be using size of each root parent later
  }

  findRootParent(i) {
    if (i !== this.parent[i]) {
      this.parent[i] = this.findRootParent(this.parent[i]);
    }
    return this.parent[i];
  }

  unionBySize(u, v) {
    const rootU = this.findRootParent(u);
    const rootV = this.findRootParent(v);

    if (rootU === rootV) return;
    if (this.size[rootU] < this.size[rootV]) {
      this.parent[rootU] = rootV;
      this.size[rootV] += this.size[rootU];
    } else {
      this.parent[rootV] = rootU;
      this.size[rootU] += this.size[rootV];
    }
  }
}

const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

var largestIsland = function (grid) {
  // Approach: use disjoint set to group the island cells and create the components
  // after all the land cells are grouped as components
  // iterate through the matrix and for each cell, check for the sea cell to mark it as a land cell
  // without marking, check the neighboring cells and if they are land cells
  // if yes, instead of union(ing) the cells into a component- get the size of the components that
  // these neighbor cells are part of. And calculate the maximum.

  // PS: there's a possibility that a sea cell can have multiple neighbors that belong to the same component
  // with the current approach, there's a possibility of adding the size of same component multiple times for
  // each neighbor cell which results in a wromg result. To avoid that, instead of directly adding the size of
  // components, push the root parent of each neighbor into a set(avoids duplication) and later get the size of
  // each root parent from the set and then update the maximum.

  // Edge case: if the grid contains all land cells, then we need to return the size of the root parent
  // check if the grid contains atleast one sea cell. if not, return maximum of the size of the root parent
  let hasZero = false;
  // Step01: create components
  const n = grid.length; // given that the grid is a n*n binary grid
  const ds = new DisjointSet(n * n);

  // either we can represent each cell as a string in the disjoint set
  // or we can use an integer value to represent n*n cells in the array
  const getCellId = (r, c) => r * n + c;

  // create components
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      // skip the cell if it's sea cell.
      if (grid[r][c] === 0) {
        hasZero = true;
        continue;
      }
      const currNode = getCellId(r, c);
      // union the neighbor cells if they are land cells
      for (const [dr, dc] of directions) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] === 1) {
          const nextNode = getCellId(nr, nc);
          ds.unionBySize(currNode, nextNode);
        }
      }
    }
  }

  // early return: if the grid doesnt have any zero's, return the maximum size of the root parent
  if (!hasZero) return Math.max(...ds.size);

  // step02: land cells are grouped into components
  // now we need to traverse through the grid and identify the sea cells
  // if found, we need to check the neighboring cells and if they are land cells
  // if yes, add the root parent of each neighbor into a set and then compute the total size
  // of the possible large component
  let max = 0;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 1) continue;
      const rootParents = new Set();
      for (const [dr, dc] of directions) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] === 1) {
          const rootParent = ds.findRootParent(getCellId(nr, nc));
          rootParents.add(rootParent);
        }
      }
      // compute the total size of the possible large component
      let size = 0;
      for (const rootParent of rootParents) {
        size += ds.size[rootParent];
      }
      max = Math.max(max, size + 1); // adding 1 as we need to include the current sea cell into the large component
    }
  }
  return max;
};
