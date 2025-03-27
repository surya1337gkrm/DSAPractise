const catsAndBoots = (n) => {
  const output = [];
  for (const i = 1; i <= n; i++) {
    let res = '';
    if (n % 5 === 0 || n.toString().includes('5')) res += 'Cats';
    if (n % 7 === 0 || n.toString().includes('7')) res += 'Dogs';

    if (res === '') return n;
    else return res;
  }
};

// [1,5,7,10,14,57,75,175].forEach(el=>console.log(catsAndBoots(el)))

function div5(n) {
  return n % 5 === 0;
}

function div7(n) {
  return n % 7 === 0;
}

function contains5(n) {
  return n.toString().includes('5');
}

function contains7(n) {
  return n.toString().includes('7');
}

// O(2^C×N) TC in general but here C:conditions is constant so TC is O(1)

const test = () => {
  const conditions = ['div5', 'contains5', 'div7', 'contains7'];
  // conditions.forEach(c=>console.log(c.name))
  const ops = ['not', ''];
  const output = [];

  // construct operation combinations
  const combos = [];
  for (const op1 of ops) {
    for (const op2 of ops) {
      for (const op3 of ops) {
        for (const op4 of ops) {
          combos.push([op1, op2, op3, op4]);
        }
      }
    }
  }

  // console.log(combos)

  // now we need to construct the expressions
  for (const combo of combos) {
    const expArray = conditions.map((condition, idx) => {
      return combo[idx] === 'not' ? `!${condition}(i)` : `${condition}(i)`;
    });

    const expression = expArray.join(' && ');
    // console.log(expression)

    // now that we have expression, we need to find the minimum
    // number in the range that satisfies the condition
    for (let i = 1; i <= 200; i++) {
      // console.log('test')
      let res = eval(expression);
      if (res) {
        output.push([expression, i]);
        break;
      }
    }
  }

  // console.log(output)
  output.forEach(([expression, result]) =>
    console.log(`${expression} -> ${result}`)
  );
};
test();
