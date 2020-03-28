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

  console.log('\n=== 并行启动 ===');

  const slow = resolveAfter2Seconds();
  const fast = resolveAfter1Seconds();

  console.log(
    `${await slow} 花去了 ${parseInt((Date.now() - start) / 1000)} 秒`
  );
  console.log(
    `${await fast} 花去了 ${parseInt((Date.now() - start) / 1000)} 秒`
  );
};

sequentialStart();

setTimeout(concurrentStart, 4000);
