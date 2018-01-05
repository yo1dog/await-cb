module.exports = function awaitCb(fn) {
  return new Promise(resolve => fn((...args) => resolve(args)));
};