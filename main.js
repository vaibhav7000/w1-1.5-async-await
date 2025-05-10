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