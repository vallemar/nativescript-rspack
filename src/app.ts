import { createApp } from "nativescript-vue";
import "./app.scss";
import Home from "./components/Home.vue";

createApp(Home).start();

/* TEST WORKERS */
console.log(import.meta.url);
console.log(new URL(import.meta.url));

//const worker = new Worker(new URL("./workerTS", import.meta.url));

/* const worker1 = new Worker(new URL("./worker.js", import.meta.url));

worker.postMessage({
  src: { dataEntryWorker: "valueDataEntryWorker" },
  mode: "scale",
});
worker.onmessage = function (message) {
  console.log("ON WORKER", message.data);
  if (message.data.success) {
    worker.terminate();
  } else {
    // handle unsuccessful task
  }
};

// handle worker errors
worker.onerror = function (err) {
  console.log(
    `An unhandled error occurred in worker: ${err.filename}, line: ${err.lineno} :`,
    err.message
  );
}; */

//const worker = new Worker("./worker.js");
//const worker = new Worker("~/worker.js");
//const worker = new Worker("@/worker.js");
//const worker = new Worker("/worker.js");
//const worker = new Worker("worker.js");
