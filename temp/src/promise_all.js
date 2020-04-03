let p = Promise.all([Promise.resolve(1), Promise.resolve(2)]);

console.log(p);
console.log(p.then((v) => console.log(v)));

setTimeout(() => {
  console.log('the stack is now empty');
  console.log(p);
});

let p1 = new Promise((resolve) => {
  setTimeout(resolve, 1000, 'one');
});

let p2 = new Promise((_, reject) => {
  setTimeout(reject, 3000, 'error');
});

Promise.all([p1, p2])
  .then((v) => console.log(v))
  .catch((e) => console.log(e));
