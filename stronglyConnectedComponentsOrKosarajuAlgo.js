// GFG: https://www.geeksforgeeks.org/problems/strongly-connected-components-kosarajus-algo/1

// Strongly Connected Component(SCC)?: In a directed graph, SCC is A subset vertices which are connected from each other
// i.e, path exists from each vertex to every other vertex in the subset.

// Kosaraju Algorithm is used to find the strongly connected components in a directed graph.
// Approach?: Kosaraju Algo involves three steps
// Step 01: Perform DFS on the given graph to get the finishing order of the vertices.
// store the finishing order in a stack. When popped from the stack, vertex which is finished last will be explored first in the later steps.
// Step0 02: Reverse the given graph i.e,reverse the edges in the given graph.
// Step 03: Perform DFS on the reversed graph to get the strongly connected components.
// if there's a path from each vertex to every other vertex in the component, it means these subset vertices forms a cycle.
// reversing the edges will not change the cycle from the component. As we dont visit the already visited nodes, we will end the dfs and push the component to scc list.
// Time Complexity: O(V+E)

const kosaraju = adj => {
  // Step 01: perform DFS on the given graph
  const visited = new Set();
  const stack = [];

  const dfs1 = node => {
    visited.add(node);
    for (const neighbor of adj[node]) {
      if (!visited.has(neighbor)) {
        dfs1(neighbor);
      }
    }
    // push the node to the stack once all child nodes are explored/visited.
    stack.push(node);
  };

  for (let i = 0; i < adj.length; i++) {
    if (!visited.has(i)) {
      dfs1(i);
    }
  }

  // Step 02: Reverse the given graph
  const reversedGraph = new Map();
  for (let i = 0; i < adj.length; i++) {
    for (const neighbor of adj[i] || []) {
      if (!reversedGraph.has(neighbor)) {
        reversedGraph.set(neighbor, []);
      }
      reversedGraph.get(neighbor).push(i);
    }
  }

  const dfs2 = (node, component) => {
    visited.add(node);
    component.push(node);
    for (const neighbor of reversedGraph.get(node) || []) {
      if (!visited.has(neighbor)) {
        dfs2(neighbor, component);
      }
    }
  };

  // Step 03: Perform DFS on the reversed graph
  const scc = []; // to store the strongly connected components
  visited.clear(); // we can use the same visited set which was used for the first DFS
  while (stack.length > 0) {
    const node = stack.pop();
    if (!visited.has(node)) {
      const component = [];
      dfs2(node, component);
      scc.push(component);
    }
  }

  console.log(scc);
  return scc.length; // problem statement: return the number of scc
};

console.log(kosaraju([[2, 3], [0], [1], [4], []]));
console.log(kosaraju([[1], [2], [0]]));
console.log(kosaraju([[1], []]));
