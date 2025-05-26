// Leetcode: https://leetcode.com/problems/accounts-merge/description/
/**
 * @param {string[][]} accounts
 * @return {string[][]}
 */

class DisjointSet {
  constructor() {
    this.parent = {};
    this.rank = {};
    this.emailToName = {};
  }

  findRootParent(i) {
    if (!(i in this.parent)) {
      this.parent[i] = i;
      this.rank[i] = 0;
    }
    if (i !== this.parent[i]) {
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
    } else if (this.rank[rootU] > this.rank[rootV]) {
      this.parent[rootV] = rootU;
    } else {
      this.parent[rootV] = rootU;
      this.rank[rootU]++;
    }
  }

  setName(email, name) {
    this.emailToName[email] = name;
  }

  getName(email) {
    return this.emailToName[email];
  }
}
var accountsMerge = function (accounts) {
  // Approach 01: Use Disjoint set with slight modifications
  // instead of using a fixed size array to store parents, use a hashmap/object to store parent & rank data
  // and group all emails of a username and then whenever same email appears for another item in the array
  // parent for that email will point to the previous element in the array which have the same email.
  // and use another object to store the email to name relation.

  const ds = new DisjointSet();

  // iterate through each account and get the name and emails separately
  for (const [name, ...emails] of accounts) {
    // now for each email, set the name to the email and then
    // union the emails with the first email in the array i.e group the emails to the first email
    for (const email of emails) {
      ds.setName(email, name);
      ds.unionByRank(emails[0], email); // emails[0] will be the root
    }
  }

  // Now that the grouping is done, each email will have its root parent updated
  // now we have to check parent for each email in the emailToName obj and map
  // emails to the parent
  const emailToParent = {};
  for (const email in ds.emailToName) {
    const parent = ds.findRootParent(email);
    // check if the parent exists in the obj, if not add it.
    if (parent in emailToParent) {
      emailToParent[parent].push(email);
    } else {
      emailToParent[parent] = [email];
    }
  }

  // Grouped emails by their parent and now return the result
  // first element should be the name and then next grouped emails should be sorted alhpabetically
  return Object.entries(emailToParent).map(([email, emailArr]) => [
    ds.getName(email),
    ...emailArr.sort(),
  ]);
};

console.log(
  accountsMerge(
    (accounts = [
      ['John', 'johnsmith@mail.com', 'john_newyork@mail.com'],
      ['John', 'johnsmith@mail.com', 'john00@mail.com'],
      ['Mary', 'mary@mail.com'],
      ['John', 'johnnybravo@mail.com'],
    ])
  )
);

var accountsMergeV2 = function (accounts) {
  // Approach 02: Intution is same - will be using disjoint set methods
  // but without seperately defining a class - which adds an overhead.
  // and adding functions and objects within the function will make the access easier

  const parent = {};
  const emailToName = {};

  const findRootParent = i => {
    if (!(i in parent)) {
      parent[i] = i;
    }
    if (i !== parent[i]) {
      parent[i] = findRootParent(parent[i]);
    }
    return parent[i];
  };

  const union = (u, v) => {
    const rootU = findRootParent(u);
    const rootV = findRootParent(v);
    if (rootU !== rootV) {
      parent[rootV] = rootU;
    }
  };

  // update email associated with the username and also union the emails with the first email in the array
  // i.e group the emails to the first email
  for (const [name, ...emails] of accounts) {
    for (const email of emails) {
      emailToName[email] = name;
      union(emails[0], email); // emails[0] will be the root
    }
  }

  // Now that the grouping is done, each email will have its root parent updated
  // now we have to check parent for each email in the emailToName obj and map emails to the parent
  const emailsToParent = {};
  for (const email in emailToName) {
    const parent = findRootParent(email);
    // check if the parent exists in the obj, if not add it.
    if (parent in emailsToParent) {
      emailsToParent[parent].push(email);
    } else {
      emailsToParent[parent] = [email];
    }
  }

  // now we have group of emails connected to the parent email
  // get the parent name and sort the emails and return the result
  return Object.entries(emailsToParent).map(([email, emailArr]) => [
    emailToName[email],
    ...emailArr.sort(),
  ]);
};
console.log(
  'Using V2:',
  accountsMergeV2(
    (accounts = [
      ['John', 'johnsmith@mail.com', 'john_newyork@mail.com'],
      ['John', 'johnsmith@mail.com', 'john00@mail.com'],
      ['Mary', 'mary@mail.com'],
      ['John', 'johnnybravo@mail.com'],
    ])
  )
);

var accountsMergeV3 = function (accounts) {
  // Approach 02: Use DFS
  // generate an undirected graph: first email in each item of the array will be the rootnode
  // a->b and b->a: both should be added to the graph
  const graph = {};
  const emailToName = {};

  for (const [name, ...emails] of accounts) {
    // we dont have to add a self edge for the first email in the array
    // so skip the first email in the array
    for (let i = 0; i < emails.length; i++) {
      const email = emails[i];
      emailToName[email] = name;
      if (!(email in graph)) {
        graph[email] = [];
      }

      if (i > 0) {
        // adding an edge between first email and other emails
        graph[email].push(emails[0]);
        graph[emails[0]].push(email);
      }
    }
  }
  // use a set to keep track of the visited nodes
  const visited = new Set();
  const result = [];

  const dfs = (email, component) => {
    visited.add(email);
    component.push(email);
    for (const neighbor of graph[email] || []) {
      if (!visited.has(neighbor)) {
        dfs(neighbor, component);
      }
    }
  };

  // start dfs for each unqiue email in the graph if its not visited yet
  for (const email in graph) {
    if (!visited.has(email)) {
      const component = []; // to store the nodes that form a component
      dfs(email, component);
      //emails has to be sorted
      component.sort();
      result.push([emailToName[email], ...component]);
    }
  }
  return result;
};
console.log(
  'Using V3:',
  accountsMergeV3(
    (accounts = [
      ['John', 'johnsmith@mail.com', 'john_newyork@mail.com'],
      ['John', 'johnsmith@mail.com', 'john00@mail.com'],
      ['Mary', 'mary@mail.com'],
      ['John', 'johnnybravo@mail.com'],
    ])
  )
);
