import "@nativescript/core/globals";
import { createApp } from "nativescript-vue";
import "./app.scss";
import Home from "./components/Home.vue";

createApp(Home).start();

/* TEST WORKERS */

const worker = new Worker(new URL("./worker", import.meta.url));

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
};
