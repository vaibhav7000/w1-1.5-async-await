// run `node index.js` in the terminal

console.log(`Hello Node.js v${process.versions.node}!`);

// core / thread -> performs only a single task at a given point of time, it may context switch between different task

// synchronous / single threaded languages -> always perform single task at a given point of time / runs the code line by line and does not able to delegate their task to other threads / cores
// asynchronous / multi-threaded languages -> Can perform multiple task at single point of time by delegating the task to the other threads / cores (sought of parallelizing the task)


// sync functions / normal function -> all the code present inside block will have to run by single thread / core
// async function -> the code inside the function can be delegated to other core / thread and the main thread / core can do its futher task and once the other thread / core finishes the task I wait for the main thread to gets finish and provides the result of the delegated task

// JS uses the "async function" to use the approach of delegating the task, these functionality is provided by the run-time environment not part of the JS ecmascript

// => all the time taking tasks such as reading file from file system will all be done using the async approach because we can delegate the task to the other threads


// => all the time consuming task will be delegated to other other thread / core using the async function

// setTimeout, setInterval, fetch -> example of async function these functions are provided by the JS default

// whenever we use the asynchronous function in JS, the main thread delegate the task to other thread and hence peforms the rest of the code and when the other thread / core completes the task, if the main thread is free will execute the result of the asynchronous task (most of the time will run the callback function that is provided to it)

// only the async functions / asynchronous functions gives JS the power to delegate the task to other thread if not feature is feature then the main thread will perform all the time consuming task by itself and JS becomes very slow.
