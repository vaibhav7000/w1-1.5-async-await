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

// "Promises" -> provides better way of writing the async functions (will make it easy passing of the callback to the async functions) => now you have to wrap the async function inside the the Promise class

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
