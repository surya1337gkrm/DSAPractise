// GCD of two numbers
const gcd = (a, b) => {
  while (b) {
    [a, b] = [b, a % b];
  }
  return a;
};
console.log(gcd(2, 4));
console.log(gcd(12, 18));

const lcm = (a, b) => {
  return (a * b) / gcd(a, b);
};

console.log(lcm(12, 18));
