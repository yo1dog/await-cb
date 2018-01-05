const acb = require('./');

async function test() {
  const [err, res1, res2] = await acb(cb => myAsyncFunc('fu', 'bar', cb));
  assert(err  === 'err' );
  assert(res1 === 'res1');
  assert(res2 === 'res2');

  const [res3] = await acb(cb => myNonStandardAsyncFunc('hello', cb, 'other', 'stuff'));
  assert(res3  === 'res3');
  
  const beforeTimeMs = Date.now();
  await acb(cb => setTimeout(cb, 5));
  const afterTimeMs = Date.now();
  assert(afterTimeMs - beforeTimeMs >= 5);
}

function myAsyncFunc(fu, bar, cb) {
  setTimeout(() => cb('err', 'res1', 'res2'), 1);
}
function myNonStandardAsyncFunc(hello, cb, other, stuff) {
  setTimeout(() => cb('res3'), 1);
}

function assert(test) {
  if (!test) {
    throw new Error('Assertion failed.');
  }
}

test()
.then(() => {
  console.log('Tests passed.');
  process.exit(0);
})
.catch(err => {
  console.error(err);
  process.exit(1);
});