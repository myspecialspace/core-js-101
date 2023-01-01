/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise       *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Return Promise object that is resolved with string value === 'Hooray!!! She said "Yes"!',
 * if boolean value === true is passed, resolved with string value === 'Oh no, she said "No".',
 * if boolean value === false is passed, and rejected
 * with error message === 'Wrong parameter is passed! Ask her again.',
 * if is not boolean value passed
 *
 * @param {boolean} isPositiveAnswer
 * @return {Promise}
 *
 * @example
 *    const p1 = willYouMarryMe(true);
 *    p1.then(answer => console.log(answer)) // 'Hooray!!! She said "Yes"!'
 *
 *    const p2 = willYouMarryMe(false);
 *    p2.then(answer => console.log(answer)) // 'Oh no, she said "No".';
 *
 *    const p3 = willYouMarryMe();
 *    p3.then(answer => console.log(answer))
 *      .catch((error) => console.log(error.message)) // 'Error: Wrong parameter is passed!
 *                                                    //  Ask her again.';
 * new Promise((resolveOuter) => {
     resolveOuter(
       new Promise((resolveInner) => {
         setTimeout(resolveInner, 1000);
       })
     );
   });
 */
function willYouMarryMe(isPositiveAnswer) {
  return new Promise((resolveOuter, rejected) => {
    if (typeof isPositiveAnswer === 'boolean') {
      resolveOuter(isPositiveAnswer ? 'Hooray!!! She said "Yes"!' : 'Oh no, she said "No".');
    } else {
      rejected(new Error('Wrong parameter is passed! Ask her again.'));
    }
  });
}


/**
 * Return Promise object that should be resolved with array containing plain values.
 * Function receive an array of Promise objects.
 *
 * @param {Promise[]} array
 * @return {Promise}
 *
 * @example
 *    const promises = [Promise.resolve(1), Promise.resolve(3), Promise.resolve(12)]
 *    const p = processAllPromises(promises);
 *    p.then((res) => {
 *      console.log(res) // => [1, 2, 3]
 *    })
 * =====================================
 * Promise.all() static method takes an iterable of promises as input and returns a single Promise.
 * Promise.all(iterable)
 * ========================================
 * const promise1 = Promise.resolve(3);
 * const promise2 = 42;
 * const promise3 = new Promise((resolve, reject) => {
 * setTimeout(resolve, 100, 'foo');
 * });

 *Promise.all([promise1, promise2, promise3]).then((values) => {
 * console.log(values);
 * });
 * expected output: Array [3, 42, "foo"]
 */
function processAllPromises(array) {
  return Promise.all(array);
}

/**
 * Return Promise object that should be resolved with value received from
 * Promise object that will be resolved first.
 * Function receive an array of Promise objects.
 *
 * @param {Promise[]} array
 * @return {Promise}
 *
 * @example
 *    const promises = [
 *      Promise.resolve('first'),
 *      new Promise(resolve => setTimeout(() => resolve('second'), 500)),
 *    ];
 *    const p = processAllPromises(promises);
 *    p.then((res) => {
 *      console.log(res) // => [first]
 *    })
 * The Promise.race() static method takes an iterable of promises
 * as input and returns a single Promise. This returned promise settles
 * with the eventual state of the first promise that settles.
 *
   const promise1 = new Promise((resolve, reject) => {
     setTimeout(resolve, 500, 'one');
   });

   const promise2 = new Promise((resolve, reject) => {
     setTimeout(resolve, 100, 'two');
   });

   Promise.race([promise1, promise2]).then((value) => {
     console.log(value);
     // Both resolve, but promise2 is faster
   });
   // expected output: "two"
 */
function getFastestPromise(array) {
  return Promise.race(array);
}

/**
 * Return Promise object that should be resolved with value that is
 * a result of action with values of all the promises that exists in array.
 * If some of promise is rejected you should catch it and process the next one.
 *
 * @param {Promise[]} array
 * @param {Function} action
 * @return {Promise}
 *
 * @example
 *    const promises = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];
 *    const p = chainPromises(promises, (a, b) => a + b);
 *    p.then((res) => {
 *      console.log(res) // => 6
 *    });
 *
 * new Promise((resolveOuter) => {
     resolveOuter(
       new Promise((resolveInner) => {
         setTimeout(resolveInner, 1000);
       })
     );
   });
 */
function chainPromises(array, action) {
  return new Promise((resolveOuter) => {
    const result = [];
    array.map((el) => el.then((res) => result.push(res)));

    resolveOuter(result);
  }).then((res) => res.reduce(action));
}

module.exports = {
  willYouMarryMe,
  processAllPromises,
  getFastestPromise,
  chainPromises,
};
