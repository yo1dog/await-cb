function awaitCb(fn) {
  return new Promise(resolve => fn((...args) => resolve(args)));
};

function awaitErrCb(fn) {
  return new Promise((resolve, reject) => fn((err, ...args) => err? reject(err) : resolve(args)));
};

module.exports = awaitCb;
module.exports.awaitCb = awaitCb;
module.exports.awaitErrCb = awaitErrCb;