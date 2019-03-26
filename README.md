# await-cb

An modern, unintrusive, and extremely simple callback-to-promise wrapper that makes no assumptions.

- **Modern**: Built for use with ES2017 features. Specifically, `await`.
- **Unintrusive**: Everything is passed through as-is. No assumptions are made about parameters. No overriding functions. No messing with `this`. No nonsense.
- **Simple**: Take a [look](/index.js) for yourself. Simplicity means it works exactly as expected in all cases. 0 dependencies. 0 bloat.

This wrapper provides a callback function and returns a `Promise`. When the callback is called, the parameters are passed as-is in an array to `promise.resolve`. That's it.

The `awaitErrCb` function is also provided as a convenience for handling the standard callback convention when the first parameter is expected to be an error. This function is identical to `awaitCb` except it **does** make this assumption. If an error is returned by the callback the promise is rejected with the error.

`await` makes handeling promises easy. Array destructuring allows you to intuitively define the callback parameters. Arrow functions maintain `this`.


## Usage

```javascript
const acb = require('await-cb');

const [err, res1, res2] = await acb(cb => myAsyncFunc('fu', 'bar', cb));

const [res3] = await acb(cb => myNonStandardAsyncFunc('heelo', cb, 'other', 'stuff'));

await acb(cb => setTimeout(cb, 3000));
```

```javascript
const {awaitCb, awaitErrCb} = require('await-cb');

const [err, res1, res2] = await awaitCb   (cb => myAsyncFunc('fu', 'bar', cb));
const      [res1, res2] = await awaitErrCb(cb => myAsyncFunc('fu', 'bar', cb)); // throws
```