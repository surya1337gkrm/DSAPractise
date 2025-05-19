// GFG: https://www.geeksforgeeks.org/problems/minimum-spanning-tree-kruskals-algorithm/1

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
var kruskalsMST = (V, edges) => {
  // Approach: In kruskal's algorithm, we use Disjoint set to get the minimum spanning tree.
  // Step 01: sort the given edges based on the edge weights
  // Step 02: Then iterate through edges(as they were sorted, edges with minimum weight)
  // will be explored first. For each edge, check if they have same root parent.
  // if they have same root parent, that means both nodes are already connected and we have a edge
  // in the spanning tree. So we can skip - if not, then add this edge to the spanning tree.
  edges.sort((a, b) => a[2] - b[2]);
  let mst = [];
  let mstCost = 0;
  const ds = new DisjointSet(V);
  for (const [u, v, cost] of edges) {
    if (ds.findRootParent(u) !== ds.findRootParent(v)) {
      ds.unionByRank(u, v);
      mst.push([u, v, cost]);
      mstCost += cost;
    }
  }
  console.log(mst);
  return mstCost;
};

console.log(
  kruskalsMST(
    (V = 3),
    (edges = [
      [0, 1, 5],
      [1, 2, 3],
      [0, 2, 1],
    ])
  )
);
console.log(kruskalsMST((V = 2), (edges = [[0, 1, 5]])));
