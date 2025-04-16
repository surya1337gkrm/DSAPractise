// leetcode: https://leetcode.com/problems/flood-fill/description/

/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} color
 * @return {number[][]}
 */

var floodFill = function (image, sr, sc, color) {
  // return the same image if the color and color at [sr][sc] is same.
  if (image[sr][sc] === color) return image;

  // helper function: recursive fn
  var fill = function (image, sr, sc, color, ogColor) {
    // base condition: as we call this fn recursively and access the color using sr & sc
    // ... sr & sc values should be withing the image boundaries
    if (sr < 0 || sc < 0 || sr >= image.length || sc >= image[0].length) return;

    // as we shouldnt change the color if the block has the og color
    if (image[sr][sc] !== ogColor) return;

    // update the color
    image[sr][sc] = color;

    // call fn recursively for top,right,bottom,left
    // top
    fill(image, sr - 1, sc, color, ogColor);
    //right
    fill(image, sr, sc + 1, color, ogColor);
    //bottom
    fill(image, sr + 1, sc, color, ogColor);
    //left
    fill(image, sr, sc - 1, color, ogColor);
  };

  // pass the original color to the recursive fn:
  fill(image, sr, sc, color, image[sr][sc]);

  return image;
};

// (Preferred) Floodfill without using recursion(v2) : Same as previous code with slight mods
var floodFillV2 = function (image, sr, sc, color) {
  // return the same image if the color and color at [sr][sc] is same.
  const ogColor = image[sr][sc];
  if (ogColor === color) return image;

  const rows = image.length;
  const cols = image[0].length;

  const directions = [
    [-1, 0], //top
    [0, 1], //right
    [1, 0], //bottom
    [0, -1], //left
  ];

  // helper function: dfs with recursive approach
  const dfs = (r, c) => {
    // considering the initial values sr,sc are within the image boundary
    image[r][c] = color;
    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;
      if (
        nr >= 0 &&
        nr < rows &&
        nc >= 0 &&
        nc < cols &&
        image[nr][nc] === ogColor
      ) {
        dfs(nr, nc);
      }
    }
  };

  dfs(sr, sc);
  return image;
};
console.log(
  floodFillV2(
    [
      [1, 1, 1],
      [1, 1, 0],
      [1, 0, 1],
    ],
    1,
    1,
    2
  )
);

// Using iterative DFS instead of recursion: useful for very deep graphs
const floodFillV3 = (image, sr, sc, color) => {
  // return the same image if the color and color at [sr][sc] is same.
  const ogColor = image[sr][sc];
  if (ogColor === color) return image;

  // keep a array of the same dimensions as the image to track visited nodes
  const visited = Array.from({ length: image.length }, () =>
    new Array(image[0].length).fill(false)
  );

  const rows = image.length;
  const cols = image[0].length;

  const directions = [
    [-1, 0], //top
    [0, 1], //right
    [1, 0], //bottom
    [0, -1], //left
  ];

  const stack = [[sr, sc]];
  while (stack.length > 0) {
    const [r, c] = stack.pop();
    if (visited[r][c]) continue;
    visited[r][c] = true;
    image[r][c] = color;
    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;
      if (
        nr >= 0 &&
        nr < rows &&
        nc >= 0 &&
        nc < cols &&
        image[nr][nc] === ogColor
      ) {
        stack.push([nr, nc]);
      }
    }
  }

  return image;
};
console.log(
  'V3: ',
  floodFillV3(
    [
      [1, 1, 1],
      [1, 1, 0],
      [1, 0, 1],
    ],
    1,
    1,
    2
  )
);
