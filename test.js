const awaitCb = require('./');
const awaitErrCb = awaitCb.awaitErrCb;

async function test() {
  // test exports (should be able to `require('./')` and `require('./').awaitCb`)
  assert(awaitCb.awaitCb === awaitCb);
  
  let results;
  results = await awaitCb(cb => myAsyncFunc('fu', 'bar', cb));
  assert(results.join(',') === 'err,res1,res2');
  
  results = await awaitCb(cb => myNonStandardAsyncFunc('hello', cb, 'other', 'stuff'));
  assert(results.join(',') === 'res3');
  
  const beforeTimeMs = Date.now();
  await awaitCb(cb => setTimeout(cb, 5));
  const afterTimeMs = Date.now();
  assert(afterTimeMs - beforeTimeMs >= 5);
  
  results = null;
  let caughtErr = null;
  try {
    results = await awaitErrCb(cb => myAsyncFunc('fu', 'bar', cb));
  } catch(err) {
    caughtErr = err;
  }
  assert(caughtErr === 'err');
  assert(!results);
  
  results = null;
  caughtErr = null;
  try {
    results = await awaitErrCb(cb => myAsyncFuncNoErr('fu', 'bar', cb));
  } catch(err) {
    caughtErr = err;
  }
  assert(!caughtErr);
  assert(results.join(',') === 'res1,res2');
}

function myAsyncFunc(fu, bar, cb) {
  setTimeout(() => cb('err', 'res1', 'res2'), 1);
}
function myAsyncFuncNoErr(fu, bar, cb) {
  setTimeout(() => cb(null, 'res1', 'res2'), 1);
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