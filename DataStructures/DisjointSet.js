// Disjoint Set | findParent, UnionByRank, UnionBySize methods
// Disjoint set: a data structure that keeps track of a set of elements partitioned into a number of disjoint subsets.

class DisjointSet {
  // We arent constructing a graph - instead, we are just grouping the nodes
  // rank of node?: height of a tree with the node as root
  // size of node?: number of nodes in the subset
  constructor(n) {
    // when started with n elements, each element is its own parent and rank is 0
    // using n+1 so that this will work for both 0 & 1 based index
    this.parent = Array.from({ length: n + 1 }, (_, i) => i);
    this.size = new Array(n + 1).fill(1); // size of each subset is 1 initially
    this.rank = new Array(n + 1).fill(0);
  }

  findRootParent(i) {
    if (this.parent[i] === i) return i;
    // recursively call until we reach root of the tree
    const parent = this.findRootParent(this.parent[i]);
    // update the parent in the parent array
    this.parent[i] = parent;
    return parent;
  }

  unionByRank(u, v) {
    const rootU = this.findRootParent(u);
    const rootV = this.findRootParent(v);

    if (rootU === rootV) return;
    // if rank of u is less than rank of v, then make v as parent of u
    // when a smaller subtree is attached to the higher subtree, height of the overall tree doesnt change
    // but when height of subtree u & v are same, when the parent is updated then heights changes
    if (this.rank[rootU] < this.rank[rootV]) {
      this.parent[rootU] = rootV;
    } else if (this.rank[rootV] < this.rank[rootU]) {
      this.parent[rootV] = rootU;
    } else {
      this.parent[rootV] = rootU;
      this.rank[rootU]++;
    }
  }

  unionBySize(u, v) {
    // simillar to the unionByRank but instead we use size of each subtree.
    // unlike rank, size of the subtree increases whenever new subtree added to a node.
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

const ds = new DisjointSet(7);

ds.unionByRank(1, 2);
ds.unionByRank(2, 3);
ds.unionByRank(4, 5);
ds.unionByRank(6, 7);
ds.unionByRank(5, 6);

if (ds.findRootParent(3) == ds.findRootParent(7)) {
  console.log('Same');
} else console.log('Not Same');

ds.unionByRank(3, 7);
if (ds.findRootParent(3) == ds.findRootParent(7)) {
  console.log('Same');
} else console.log('Not Same');

const ds2 = new DisjointSet(7);

ds2.unionBySize(1, 2);
ds2.unionBySize(2, 3);
ds2.unionBySize(4, 5);
ds2.unionBySize(6, 7);
ds2.unionBySize(5, 6);

if (ds2.findRootParent(3) == ds2.findRootParent(7)) {
  console.log('Same');
} else console.log('Not Same');

ds2.unionBySize(3, 7);
if (ds2.findRootParent(3) == ds2.findRootParent(7)) {
  console.log('Same');
} else console.log('Not Same');
