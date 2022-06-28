import React from "react";
const MicRecorder = require("mic-recorder-to-mp3");

function Demo() {
  const recorder = new MicRecorder({
    bitRate: 128,
  });
  function start() {
    recorder
      .start()
      .then(() => {})
      .catch((e) => {
        console.error(e);
      });
  }
  function stop() {
    recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const file = new File(buffer, "music.mp3", {
          type: blob.type,
          lastModified: Date.now(),
        });
        var data = new FormData();
        data.append("file", blob, "file");
        console.log(blob);
        console.log(data);
        fetch("http://127.0.0.1:5000/receive", {
          method: "POST",
          body: data,
        })
          .then((response) => response.json())
          .then((json) => {
            console.log(json);
          });
      })
      .catch((e) => {
        alert("We could not retrieve your message");
        console.log(e);
      });
  }
  return (
    <div>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
}

export default Demo;
