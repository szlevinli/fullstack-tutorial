/* eslint-disable no-unused-vars */
function foo() {
  return Promise.resolve(1);
}

async function bar() {
  return 1;
}

// foo().then((value) => console.log(value));
// bar().then((value) => console.log(value));

async function useFoo() {
  let fooValue = await foo();
  console.log(fooValue);
}

async function useBar() {
  let barValue = await bar();
  console.log(barValue);
}

// useFoo(); // print 1
// useBar(); // print 1

const resolveAfter2Seconds = () => {
  console.log('===> 开始慢速 promise 的执行');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('慢速 promise');
      console.log('<=== 结束慢速 promise 的执行');
    }, 2000);
  });
};

const resolveAfter1Seconds = () => {
  console.log('===> 开始快速 promise 的执行');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('快速 promise');
      console.log('<=== 结束快速 promise 的执行');
    }, 1000);
  });
};

const sequentialStart = async () => {
  const start = Date.now();

  console.log('=== 串行启动 ===');

  const slow = await resolveAfter2Seconds();
  console.log(`${slow} 花去了 ${parseInt((Date.now() - start) / 1000)} 秒`);

  const fast = await resolveAfter1Seconds();
  console.log(`${fast} 花去了 ${parseInt((Date.now() - start) / 1000)} 秒`);
};

const concurrentStart = async () => {
  const start = Date.now();

  console.log('\n=== 同时启动 ===');

  const slow = resolveAfter2Seconds();
  const fast = resolveAfter1Seconds();

  console.log(
    `${await slow} 花去了 ${parseInt((Date.now() - start) / 1000)} 秒`
  );
  console.log(
    `${await fast} 花去了 ${parseInt((Date.now() - start) / 1000)} 秒`
  );
};

const concurrentPromise = () => {
  const start = Date.now();

  console.log('\n=== 同时启动 ===');

  return Promise.all([resolveAfter2Seconds(), resolveAfter1Seconds()]).then(
    (messages) => {
      console.log(
        `${messages[0]} 花去了 ${parseInt((Date.now() - start) / 1000)} 秒`
      ); //slow
      console.log(
        `${messages[1]} 花去了 ${parseInt((Date.now() - start) / 1000)} 秒`
      ); //fast
    }
  );
};

const parallel = async () => {
  const start = Date.now();

  console.log('\n=== 同时执行 ===');

  await Promise.all([
    (async () =>
      console.log(
        `${await resolveAfter2Seconds()} 花去了 ${parseInt(
          (Date.now() - start) / 1000
        )}`
      ))(),
    (async () =>
      console.log(
        `${await resolveAfter1Seconds()} 花去了 ${parseInt(
          (Date.now() - start) / 1000
        )}`
      ))()
  ]);
};

const parallelPromise = () => {
  const start = Date.now();

  console.log('\n=== 同时执行 ===');

  resolveAfter2Seconds().then((message) =>
    console.log(`${message} 花去了 ${parseInt((Date.now() - start) / 1000)} 秒`)
  );
  resolveAfter1Seconds().then((message) =>
    console.log(`${message} 花去了 ${parseInt((Date.now() - start) / 1000)} 秒`)
  );
};

// sequentialStart();

// setTimeout(concurrentStart, 4000);

// concurrentStart();

// concurrentPromise();

// parallel();

parallelPromise();
