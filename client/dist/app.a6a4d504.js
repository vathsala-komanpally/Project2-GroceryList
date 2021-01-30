// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/regenerator-runtime/runtime.js":[function(require,module,exports) {
var define;
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  typeof module === "object" ? module.exports : {}
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}

},{}],"src/user/signupUser.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _loginUser = _interopRequireDefault(require("./loginUser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var form = "\n  <form id=\"new-user\">\n  <h1>Create an account</h1>\n    <div class=\"form-group\">\n      <label for=\"username\">Username</label>\n      <input type=\"text\" class=\"form-control\" placeholder=\"Please enter username of min 5 and max 15 charcters\" name=\"username\" pattern=\"^[a-z0-9]{5,15}$\" required>\n    </div>\n    <div class=\"form-group\">\n      <label for=\"mobilenumber\">MobileNumber</label>\n      <input type=\"tel\" class=\"form-control\" placeholder=\"Must start with 04 of length 10\" name=\"mobilenumber\" pattern=\"[04][0-9]{9}\"required>\n    </div>\n    <div class=\"form-group\">\n      <label for=\"Email\">Email</label>\n      <input type=\"email\" class=\"form-control\" placeholder=\"Please enter a valid email\" name=\"email\" required>\n    </div>\n    <div class=\"form-group\">\n      <label for=\"password\">Password</label>\n      <input type=\"password\" class=\"form-control\" placeholder=\"It must contain a lower case and upper case of min 8 charcters length\" \n      name=\"password\" pattern=\"(?=.*[a-z])(?=.*[A-Z]).{8,}\" required>\n    </div>\n    <button type=\"submit\" class=\"btn btn-primary\">Sign Up</button>\n  </form>\n";

var newUser = function newUser() {
  $(document).on("submit", "#new-user", /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event) {
      var formData, response;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              event.preventDefault(); // Extract user deatils from the form

              formData = {
                username: $("input[name='username']").val(),
                mobilenumber: $("input[name='mobilenumber']").val(),
                email: $("input[name='email']").val(),
                password: $("input[name='password']").val()
              };
              _context.prev = 2;
              _context.next = 5;
              return $.ajax({
                type: "POST",
                url: "/api/users/register",
                contentType: "application/json",
                data: JSON.stringify(formData)
              });

            case 5:
              response = _context.sent;
              console.log(response.email); // Clear form by calling empty function

              $("body").empty(); // Append the login form so user can now login

              $("body").append((0, _loginUser.default)());
              _context.next = 14;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](2);
              // Inform user that their login could not be created if there's an error
              $("body").append("<div>Could not create user</div>");

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 11]]);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
  return form;
};

var _default = newUser;
exports.default = _default;
},{"./loginUser":"src/user/loginUser.js"}],"src/mainPageForm.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var form = "\n<form id=\"form-Main\">\n<div id=\"container\">\n\n<table id=\"itemsTable\">\n<thead>\n<tr>\n    <th>ItemNo.</th>\n    <th>Name</th>\n    <th>Price</th>\n    <th>Quantity</th>\n</tr>\n</thead>\n<tbody id=\"resultItems\">\n</tbody>\n</table>\n\n<div id=\"groceryList\">\n</div>\n\n<footer>\n<p>Please call 123445 for enquiries</p>\n</footer>\n</div>\n</form>\n";

var mainForm = function mainForm() {
  // to store items selected by the user
  var numberOfItems = []; // number of items selected by the user

  var itemNumber = 0; //getting data from mongodb collections then dispalying that on page

  $.ajax({
    type: "GET",
    url: "/api/groceryItems/category/all"
  }).then(function (groceyItemCategories) {
    groceyItemCategories.forEach(function (itemEl) {
      $("#groceryList").append("<h2>".concat(itemEl.name, "</h2>"));
      $("#groceryList").append("<ol id=".concat(itemEl.name, "></ol>"));
      $.ajax({
        type: "GET",
        url: "/api/groceryItems/category/".concat(itemEl._id)
      }).then(function (categoryItems) {
        // products[`${itemEl.name}`] = categoryItems;
        categoryItems.forEach(function (element) {
          $("#".concat(itemEl.name)).append("<li><input class=\"itemNames\" type=\"button\" name=\"".concat(element.itemname, "\" value=\"").concat(element.itemname, " $").concat(element.price, "\"> </li>"));
        });
      });
    });
  }); //when user clicks/selects an item it gets name and price of that item

  $(document).on("click", ".itemNames", /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
      var nameOfItem, priceofItems, priceofItem;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              e.preventDefault();
              nameOfItem = e.target.name;
              priceofItems = e.target.value;
              priceofItem = priceofItems.split('$')[1];
              selectedItems(nameOfItem, priceofItem);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }()); //it checks user slected item for 1st time or not then increases quantity and price based on that

  var selectedItems = function selectedItems(nameOfItem, priceofItem) {
    var exist = numberOfItems.find(function (_ref2) {
      var itemname = _ref2.itemname;
      return itemname === nameOfItem;
    });

    if (exist) {
      itemNumber++;
      console.log("its here in exist:", exist);
      console.log(numberOfItems);
      var objIndex = numberOfItems.findIndex(function (exist) {
        return exist.itemname == nameOfItem;
      });
      numberOfItems[objIndex].repeated = exist.repeated + 1;
      numberOfItems[objIndex].price = exist.repeated * priceofItem;
      alert("you got ".concat(numberOfItems[objIndex].repeated - 1, " ").concat(nameOfItem, " in the list, Do you want to 1 more"));
    } else {
      var idItemObject = {
        id: itemNumber,
        itemname: nameOfItem,
        price: priceofItem,
        originalprice: priceofItem,
        repeated: 1
      };
      numberOfItems.push(idItemObject);
    }

    printResult();
  }; //prins all selected item details like serial number, name,price and quantity values with total price on page in table form


  function printResult() {
    var sum = 0;
    $("#resultItems").empty();

    for (var i = 0; i < numberOfItems.length; i++) {
      $("#resultItems").append("<tr>\n        <td>".concat(i + 1, "</td>\n        <td>").concat(numberOfItems[i].itemname, "</td>\n        <td>$").concat(numberOfItems[i].price, "</td>\n        <td>").concat(numberOfItems[i].repeated, "\n        <input type=\"button\" value=\"+\" class=\"plus\" name=\"").concat(numberOfItems[i].itemname, "$").concat(numberOfItems[i].price, "\" >\n           <input type=\"button\" value=\"-\" class=\"minus\"  name=\"").concat(numberOfItems[i].itemname, "$").concat(numberOfItems[i].price, "\" >\n        <button class=\"delete fa fa-trash-o\" value= \"").concat(numberOfItems[i].itemname, "$").concat(numberOfItems[i].price, "\">\n            </button></td></tr>"));
      var priceOf = numberOfItems[i].price;
      sum = +priceOf + sum;
    }

    $("#resultItems").append("<tr><th></th><th>Total price:</th><th>".concat(sum, "</th>"));
  } //its called when user clciks on '+' button


  $(document).on("click", ".plus", /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(e) {
      var newitem, nameOfItem, priceofItem;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              e.preventDefault();
              newitem = e.target.name;
              nameOfItem = newitem.split('$')[0];
              priceofItem = newitem.split('$')[1];
              selectedItems(nameOfItem, priceofItem);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x2) {
      return _ref3.apply(this, arguments);
    };
  }()); //its called when user clciks on '-' button

  $(document).on("click", ".minus", /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(e) {
      var newitem, nameOfItem, priceofItem;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              e.preventDefault();
              newitem = e.target.name;
              nameOfItem = newitem.split('$')[0];
              priceofItem = newitem.split('$')[1];
              console.log(priceofItem);
              console.log(numberOfItems);
              removeItems(nameOfItem);

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x3) {
      return _ref4.apply(this, arguments);
    };
  }()); //its called when user clciks on 'delete icon/trash' icon

  $(document).on("click", ".delete", /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(e) {
      var newitem, nameOfItem;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              e.preventDefault();
              newitem = e.target.value;
              nameOfItem = newitem.split('$')[0];
              deleteSelectedItem(nameOfItem);

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function (_x4) {
      return _ref5.apply(this, arguments);
    };
  }()); // when user clciks on '-' it decreases price and quantity and display results back to the user

  var removeItems = function removeItems(nameOfItem) {
    var exist = numberOfItems.find(function (_ref6) {
      var itemname = _ref6.itemname;
      return itemname === nameOfItem;
    });

    if (exist && exist.repeated > 1) {
      var objIndex = numberOfItems.findIndex(function (exist) {
        return exist.itemname == nameOfItem;
      });
      numberOfItems[objIndex].repeated = exist.repeated - 1;
      numberOfItems[objIndex].price = exist.price - exist.originalprice;
      alert("you have only ".concat(numberOfItems[objIndex].repeated, " ").concat(nameOfItem, " in the list"));
      printResult();
    } else if (exist.repeated = 1) {
      deleteSelectedItem(nameOfItem);
    }
  }; // when user clciks on delete icon it delets that item from the table


  var deleteSelectedItem = function deleteSelectedItem(nameOfItem) {
    var exist = numberOfItems.find(function (_ref7) {
      var itemname = _ref7.itemname;
      return itemname === nameOfItem;
    });
    var objIndex = numberOfItems.findIndex(function (exist) {
      return exist.itemname == nameOfItem;
    });
    numberOfItems.splice(objIndex, 1);
    alert("".concat(nameOfItem, " is removed from the list"));
    printResult();
  };

  return form;
};

var _default = mainForm;
exports.default = _default;
},{}],"src/user/loginUser.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _signupUser = _interopRequireDefault(require("./signupUser"));

var _mainPageForm = _interopRequireDefault(require("../mainPageForm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var form = "\n  <form id=\"login-user\">\n  <h1>Login</h1>\n  <h6>Please login to continue</h6>\n    <div class=\"form-group\">\n      <label for=\"Email\">Email</label>\n      <input type=\"text\" class=\"form-control\" placeholder=\"Please enter your email\" name=\"email\">\n    </div>\n    <div class=\"form-group\">\n      <label for=\"password\">Password</label>\n      <input type=\"password\" class=\"form-control\" placeholder=\"Please enter password\" name=\"password\">\n    </div>\n    <button type=\"submit\" class=\"btn btn-primary\">Login</button>\n  </form>\n  <button id=\"register-new-user\" class=\"btn btn-primary\">Create account to Login </button>\n";

var loginUser = function loginUser() {
  $(document).on("submit", "#login-user", /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event) {
      var formData, response;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              event.preventDefault(); // Extract username and password entered

              formData = {
                email: $("input[name='email']").val(),
                password: $("input[name='password']").val()
              };
              _context.prev = 2;
              _context.next = 5;
              return $.ajax({
                type: "POST",
                url: "/api/users/login",
                contentType: "application/json",
                data: JSON.stringify(formData)
              });

            case 5:
              response = _context.sent;
              console.log(response);
              $("body").empty(); //how to get data of user selected items of main page to here details here:
              //$("body").append(mainForm());

              _context.next = 13;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](2);
              $("body").append("<div>Invalid email/pass provided!</div>");

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 10]]);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
  return form;
};

$(document).on("click", "#register-new-user", function () {
  $("body").empty();
  $("body").append((0, _signupUser.default)());
});
var _default = loginUser;
exports.default = _default;
},{"./signupUser":"src/user/signupUser.js","../mainPageForm":"src/mainPageForm.js"}],"src/admin/addItems.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var form = "\n<form id=\"form-Add\">\n<h1>Add new items</h1>\n  <div class = \"form-group\">\n     <label for=\"itemname\">Name of item</label>\n     <input type=\"text\" class=\"form-control\" id=\"itemname\" placeholder=\"Enter a name of the item to add\" name=\"itemname\">\n  </div>\n   <div class = \"form-group\">\n     <label for=\"price\">Price</label>\n     <input type=\"text\" class=\"form-control\" id=\"price\" placeholder=\"Enter a price of item\" name=\"price\">\n  </div>\n  <div class = \"form-group\">\n  <label for=\"noofitems\">Number Of Items</label>\n  <input type=\"text\" class=\"form-control\" id=\"noofitems\" placeholder=\"Enter no. of items\" name=\"noofitems\">\n</div>\n  <fieldset class=\"form-group\">\n    <legend class=\"col-form-label\">Ready to Eat?</legend>\n    <div class=\"form-check form-check-inline\">\n      <input class=\"form-check-input\" type=\"radio\" id=\"readyToEatYes\" name =\"readyToEat\" value=\"true\">\n      <label class=\"form-check-label\" for=\"readyToEatYes\">Yes</label>\n    </div>\n    <div class=\"form-check form-check-inline\">\n      <input class=\"form-check-input\" type=\"radio\" id=\"readyToEatNo\" name =\"readyToEat\" value=\"false\">\n      <label class=\"form-check-label\" for=\"readyToEatNo\">No</label>\n    </div>\n  </fieldset>\n  <div class = \"form-group\">\n  <label for=\"categoryId\">Choose a category:</label>\n       <select name=\"categoryId\" id=\"categories\">\n        </select>\n  </div>\n  <button type=\"submit\" class=\"btn btn-primary\">Add Item</button>\n  </form>\n";

var newItem = function newItem() {
  // appending category values from database to form
  var categoryResponse = $.ajax({
    type: "GET",
    url: "/api/groceryItems/category/all"
  }).then(function (groceyItemCategories) {
    console.log("groceyItemCategories", groceyItemCategories);
    var optionsHtml = "";
    groceyItemCategories.forEach(function (itemEl) {
      console.log("itemEl", itemEl);
      optionsHtml = optionsHtml + "<option value=".concat(itemEl._id, ">").concat(itemEl.name, "</option>");
      console.log("optionsHtml", optionsHtml);
    });
    console.log("optionsHtml", optionsHtml);
    $("#categories").append(optionsHtml);
  }); //form submit button handler logic
  // async is a keyword for the function declaration

  $(document).on('submit', "form#form-Add", /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
      var requestBody, response;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              e.preventDefault();
              console.log($("#itemname").val());
              console.log($("#price").val());
              console.log($("#noofitems").val());
              console.log($("input[name=\"readyToEat\"]:checked").val());
              console.log($('#categories').val());
              console.log("Data entered"); // this is the object that gets sent as part of the post request

              requestBody = {
                itemname: $("#itemname").val(),
                price: $("#price").val(),
                noOfItems: $("#noofitems").val(),
                readyToEat: $("input[name=\"readyToEat\"]:checked").val(),
                categoryId: $("#categories").val()
              };
              console.log("requestBody", requestBody); // Making the call to post request
              // await is used during the promise handling

              _context.next = 11;
              return $.ajax({
                type: "POST",
                // OR GET
                url: "/api/groceryItems/new-item",
                contentType: "application/json",
                data: JSON.stringify(requestBody)
              });

            case 11:
              response = _context.sent;
              //.then((data)=>{ //here u can use response or data
              console.log("data:", response); // Logging response back to the console

              console.log("This is the response I get back!: ".concat(response));
              window.alert("Fruit Added!");
              $("#itemname").val("");
              $("#price").val("");
              $("#noofitems").val("");

            case 18:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
  return form;
};

var _default = newItem;
exports.default = _default;
},{}],"src/admin/updateItem.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var form = "\n<form id=\"form-Update\">\n<h1>Update items</h1>\n<div class=\"form-group\">\n    <label for=\"itemId\">Item Id </label>\n    <input type=\"text\" class=\"form-control\" id=\"itemId\" placeholder=\"Enter item Id\" name=\"itemId\">\n  </div>\n  <div class = \"form-group\">\n     <label for=\"itemname\">Name of item</label>\n     <input type=\"text\" class=\"form-control\" id=\"itemname\" placeholder=\"Enter a name of the item to add\" name=\"itemname\">\n  </div>\n   <div class = \"form-group\">\n     <label for=\"price\">Price</label>\n     <input type=\"text\" class=\"form-control\" id=\"price\" placeholder=\"Enter a price of item\" name=\"price\">\n  </div>\n  <div class = \"form-group\">\n  <label for=\"noofitems\">Number Of Items</label>\n  <input type=\"text\" class=\"form-control\" id=\"noofitems\" placeholder=\"Enter no. of items\" name=\"noofitems\">\n</div>\n  <fieldset class=\"form-group\">\n    <legend class=\"col-form-label\">Ready to Eat?</legend>\n    <div class=\"form-check form-check-inline\">\n      <input class=\"form-check-input\" type=\"radio\" id=\"readyToEatYes\" name =\"readyToEat\" value=\"true\">\n      <label class=\"form-check-label\" for=\"readyToEatYes\">Yes</label>\n    </div>\n    <div class=\"form-check form-check-inline\">\n      <input class=\"form-check-input\" type=\"radio\" id=\"readyToEatNo\" name =\"readyToEat\" value=\"false\">\n      <label class=\"form-check-label\" for=\"readyToEatNo\">No</label>\n    </div>\n  </fieldset>\n  <div class = \"form-group\">\n  <label for=\"categoryId\">Choose a category:</label>\n       <select name=\"categoryId\" id=\"categories\">\n        </select>\n  </div>\n  <button type=\"submit\" class=\"btn btn-primary\">Update Item</button>\n  </form>\n";

var updateItem = function updateItem() {
  // appending category values from database to form
  var categoryResponse = $.ajax({
    type: "GET",
    url: "/api/groceryItems/category/all"
  }).then(function (groceyItemCategories) {
    console.log("groceyItemCategories", groceyItemCategories);
    var optionsHtml = "";
    groceyItemCategories.forEach(function (itemEl) {
      console.log("itemEl", itemEl);
      optionsHtml = optionsHtml + "<option value=".concat(itemEl._id, ">").concat(itemEl.name, "</option>");
      console.log("optionsHtml", optionsHtml);
    });
    console.log("optionsHtml", optionsHtml);
    $("#categories").append(optionsHtml);
  });
  $(document).on('submit', "form#form-Update", /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
      var requestBody, response;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              e.preventDefault();
              requestBody = {
                itemname: $("#itemname").val(),
                price: $("#price").val(),
                noOfItems: $("#noofitems").val(),
                readyToEat: $("input[name=\"readyToEat\"]:checked").val(),
                categoryId: $("#categories").val()
              };
              console.log("requestBody", requestBody);
              _context.next = 5;
              return $.ajax({
                type: "PATCH",
                // OR GET
                url: "/api/groceryItems/update-item/".concat($("#itemId").val()),
                contentType: "application/json",
                data: JSON.stringify(requestBody)
              });

            case 5:
              response = _context.sent;
              window.alert(response);
              $("#itemId").val("");
              $("#itemname").val("");
              $("#price").val("");
              $("#noofitems").val("");

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
  return form;
};

var _default = updateItem;
exports.default = _default;
},{}],"src/admin/deleteItem.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Make a DELETE request to the server to delete a fruit
var form = "\n<form id=\"form-Delete\">\n<h1>Delete items</h1>\n<div class=\"form-group\">\n    <label for=\"itemId\">Item Id </label>\n    <input type=\"text\" class=\"form-control\" id=\"itemId\" placeholder=\"Enter item Id\" name=\"itemId\">\n  </div>\n  <button type=\"submit\" class=\"btn btn-primary\">Delete Item</button>\n  </form>\n";

var deleteItem = function deleteItem() {
  $(document).on('submit', "form#form-Delete", /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
      var response;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              e.preventDefault();
              _context.next = 3;
              return $.ajax({
                type: "DELETE",
                url: "/api/groceryItems/delete-item/".concat($("#itemId").val()),
                contentType: "application/json"
              });

            case 3:
              response = _context.sent;
              // Create a pop up alert in the UI to inform the user that fruit was deleted
              window.alert("Fruit Deleted!");

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
  return form;
};

var _default = deleteItem;
exports.default = _default;
},{}],"src/admin/operationAdmin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _addItems = _interopRequireDefault(require("./addItems"));

var _updateItem = _interopRequireDefault(require("./updateItem"));

var _deleteItem = _interopRequireDefault(require("./deleteItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var form = "\n<form id=\"adminOperations\">\n<h1>List of things Admin can do here:</h1>\n<label>please chooose add to add new items <br>\nor update to make any changes to existing items<br>\nor delete to delete any items\n</label><br>\n<button type=\"button\" id=\"add\" class=\"btn btn-primary\">Add</button>\n<button type=\"button\" id=\"update\" class=\"btn btn-primary\">Update</button>\n<button type=\"button\" id=\"delete\" class=\"btn btn-primary\">Delete</button>\n</form>\n";

var operationsByAdmin = function operationsByAdmin() {
  $(document).on("click", "#add", /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              e.preventDefault();
              $("body").empty();
              $("body").append((0, _addItems.default)());

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
  $(document).on("click", "#update", /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(e) {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              e.preventDefault();
              $("body").empty();
              $("body").append((0, _updateItem.default)());

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }());
  $(document).on("click", "#delete", /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(e) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              e.preventDefault();
              $("body").empty();
              $("body").append((0, _deleteItem.default)());

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x3) {
      return _ref3.apply(this, arguments);
    };
  }());
  return form;
};

var _default = operationsByAdmin;
exports.default = _default;
},{"./addItems":"src/admin/addItems.js","./updateItem":"src/admin/updateItem.js","./deleteItem":"src/admin/deleteItem.js"}],"src/admin/adminLogin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _operationAdmin = _interopRequireDefault(require("./operationAdmin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var form = "\n  <form id=\"admin-Login\">\n  <h1>Admin Login</h1>\n  <h6>please login here to update grocery items</h6>\n    <div class=\"form-group\">\n      <label for=\"username\">User Name</label>\n      <input type=\"text\" class=\"form-control\" placeholder=\"Please enter user name\" name=\"username\">\n    </div>\n    <div class=\"form-group\">\n      <label for=\"password\">Password</label>\n      <input type=\"password\" class=\"form-control\" placeholder=\"Please enter password\" name=\"password\">\n    </div>\n    <button type=\"submit\" class=\"btn btn-primary\" id=\"login\">Login</button>\n  </form>\n";

var adminUser = function adminUser() {
  $(document).on("submit", "#admin-Login", /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(event) {
      var formData, response;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              event.preventDefault(); // Extract username and password entered

              formData = {
                username: $("input[name='username']").val(),
                password: $("input[name='password']").val()
              };
              _context.prev = 2;
              _context.next = 5;
              return $.ajax({
                type: "POST",
                url: "/api/admins/login",
                contentType: "application/json",
                data: JSON.stringify(formData)
              });

            case 5:
              response = _context.sent;
              console.log(response);
              $("body").empty();
              $("body").append((0, _operationAdmin.default)());
              _context.next = 14;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](2);
              $("body").append("<div>Invalid email/pass provided!</div>");

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 11]]);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
  return form;
};

var _default = adminUser;
exports.default = _default;
},{"./operationAdmin":"src/admin/operationAdmin.js"}],"src/app.js":[function(require,module,exports) {
"use strict";

require("regenerator-runtime/runtime");

var _loginUser = _interopRequireDefault(require("./user/loginUser"));

var _adminLogin = _interopRequireDefault(require("./admin/adminLogin"));

var _mainPageForm = _interopRequireDefault(require("./mainPageForm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log("Javascript file is running");
var appForm = "\n<form id=\"form-App\">\n<div id =\"container\">\n<header>\n<h1>Welcome! to Lucky's Grocery Market</h1>\n<button id=\"finish\" type=\"submit\">Click here to Buy</button>\n<label>Please choose the items to shop from below list then:</label>\n<marquee behavior=\"scroll\" direction=\"left\">Please check our page for more updates on groceries</marquee>\n</header>\n<div id=\"admin\">\n<label>For admins only</label>\n<a href=\"#\" id=\"myHref\">Click here</a>\n<label>to update Grocery Items</label>\n</div>\n\n</div>\n</form>\n";
$("body").append(appForm);
$("body").append(_mainPageForm.default);
$("#finish").on("click", function () {
  $("body").empty();
  $("body").append((0, _loginUser.default)());
});
$("#myHref").on('click', function () {
  $("body").empty();
  $("body").append((0, _adminLogin.default)());
});
},{"regenerator-runtime/runtime":"node_modules/regenerator-runtime/runtime.js","./user/loginUser":"src/user/loginUser.js","./admin/adminLogin":"src/admin/adminLogin.js","./mainPageForm":"src/mainPageForm.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57878" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/app.js"], null)
//# sourceMappingURL=/app.a6a4d504.js.map