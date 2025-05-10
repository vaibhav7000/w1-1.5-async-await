const fs = require("fs"); // fs module provided by the run time
// async function => the code / task  present inside it will be delegated to othe thread and the main thread will perform its tasks
fs.readFile("./a.txt","utf-8", function(err,data) {
    if(err) {
        console.log("error is found");
        console.log(err);
        return
    }

    console.log(data);
})
// the JS code is run by the single core / thread and its will been run according to the JS architecture
// JS architecture includes "callstack", "webApis" and "callbackQueue"
// the callstacks runs the code line by line, whenever the callstack recieves async function that will be passed to the webApis
// the webApis is other cores / threads that will run the async functions , the callstack will provide the task async task
// the callbackQueue is where the result of the delegated task will be present and the callstack will pull the result from the callbackQueue

// Through async functions JS points to the asynchronous approach / multi-thread approach (we can know use the other thread to do the tasks parallely)

// the async functions performs the time consuming task ( that will be delegated to the other thread ) and requires a callback function that can be put inside the callbackQueue after the task is completed / ended

// most of the time we will be using JS provided async functions with other functions as wrappers and hence will follow the DRY principle

// => Everytime when using the async function we have to pass the callback function
function customReadFile(callback) {
    // earlier we are direclty calling the JS async functions and providing it the callback function
    // created a wrapper around the JS async function, that will be used to pass the callback
    fs.readFile('./a.txt',"utf-8", callback);
} 

customReadFile(function(err,data) {
    if(err) {
        console.log("error found!!")
        console.log(err);
        return
    }

    console.log(data);
})

// "Promises" -> provides better way of writing the asynchronous functions (will make it easy passing of the callback to the asynchrnous functions) => now you have to wrap the asynchronous function inside the the Promise class

function customReadFilePromiseVersion() {
    // returns promise object and on that we will use .then and .catch to map the resolve and reject variable with the callbacks that we want to pass to the async function
    // we have passed function to the constructor of the Promise class and it will call the passed function, inside it there is async function that will be send to the webApis section
    return new Promise(function(resolve,reject) {
        fs.readFile("./a.txt", "utf-8", function(err, data) {
            if(err) {
                reject(err);
                return
            }

            resolve(data);
        })
    })
}

function onDone(data) {
    console.log(data);
}

function onError(error) {
    console.log(error)
}

customReadFilePromiseVersion().then(onDone).catch(onError);

// The Promise class always require the function as an argument that function should take 2 parameters name them anything and then using .then() and .catch() we will map that vairbles with the callbacks and hence "Promise" makes easy, pretty to pass the callbacks to the async function

// .then(callback) -> this gets mapped with the resolve, when the Promise gets resolved, the resolved value will be shown inside the Promise, when we print the promise
// .catch(callback) -> this gets mapped with the reject, when the Promise gets rejected, the rejected value will be shown, when we print the promise

// (async and await) is alternative of providing callbacks(the code of the callback is put after function call) to the Promise, more cleaner than the .then and .catch syntax

// async and await should only be used only with Promise, the value that we passed to resolve that we can get using the await avoid mapping the resolve with .then
// we can use await wrapped inside the async function syntax (normal function for us but just with the async keyword)

function setTimeoutPromise(printString) {
    // wrapping the asynchronous function (setTimeout) inside the Promise class
    return new Promise(function(resolve,reject) {
        setTimeout(function() {
            resolve("The value from the asynchronous function " + printString);
        }, 5000);
    })
}


// setTimeoutPromise("How is the situation in Amritsar??").then(function(data) {
//     console.log(data);
// }) instead of passing the callback using .then we will use async await syntax and gets the value that asynchronous function passes to it

async function wrapperSetTimeout(printString) {
    const value = await setTimeoutPromise(printString);

    console.log(value);

    // async function also returns us promise that will be resolved if the function returns, if function throws error => reject will happen
}

wrapperSetTimeout("How is the Situation in amritsar??");

// fetch is also a wrapper around the http request function that returns us promise and on that we will use either .then and .catch or async await syntax (in this case we does not have to provide a callback instead get the value using await), with async await we will be using try and catch. try for resolve and catch for reject

// created a wrapper for using the Promised asynchronous function 
async function getJsonData(url) {
    // created a wrapper that returns Promise object
    try {
        const response = await fetch(url); // await gets the data that is passed to the resolve function
        const data = await response.json(); // now we actually gets the data
        
        // if the fetch calls reject than we will get back to catch with error 
        return data;
    } catch(err) {
        console.log("error cames from the getJsonData");
        throw err
    }
}


async function requestForProducts(url) {
    try {
        const data = await getJsonData(url);
        console.log(data)
        console.log("update the UI")
    } catch(err) {
        console.log(err);
    }
}

requestForProducts("https://fakestoreapi.com/products");
console.log("called requestForProducts function")