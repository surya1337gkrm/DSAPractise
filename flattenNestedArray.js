// Input: ["apples","oranges",["grapes","banana"],["cherry","pears",["mangoes","pineapple"]],"dates"]
// Output: ["apples","oranges","grapes","banana","cherry","pears","mangoes","pineapple","dates"]

const input = [
  'apples',
  'oranges',
  ['grapes', 'banana'],
  ['cherry', 'pears', ['mangoes', 'pineapple']],
  'date',
];
const flattenArrayWithRecursion = arr => {
  if (
    arr === null ||
    arr === undefined ||
    !Array.isArray(arr) ||
    arr.length === 0
  )
    return [];

  const output = [];

  const flat = item => {
    if (Array.isArray(item)) {
      for (let i = 0; i < item.length; i++) {
        flat(item[i]);
      }
    } else {
      output.push(item);
    }
  };
  flat(arr);
  return output;
};

console.log(flattenArrayWithRecursion(input));

const flattenArrayWithoutRecursion = arr => {
  if (
    arr === null ||
    arr === undefined ||
    !Array.isArray(arr) ||
    arr.length === 0
  )
    return [];

  const output = [];

  // initiate the stack with the start node/element
  // if the element is array - add that but in reverse order - so that when
  // we pop from the stack, original order is preserved.
  const stack = Array.isArray(arr) ? [...arr.reverse()] : [arr];
  while (stack.length > 0) {
    const current = stack.pop();
    if (Array.isArray(current)) {
      stack.push(...current.reverse());
    } else {
      output.push(current);
    }
  }
  return output;
};

console.log('Without recursion: ', flattenArrayWithoutRecursion(input));
