//import "@nativescript/core/globals";

self.onmessage = function (message) {
  console.log("DATA ENTRY WORKER JS", message.data);

  // send the result back to the main thread
  self.postMessage({
    success: false,
    src: JSON.stringify({ test: "TEST VALUE JS" }),
  });
};
