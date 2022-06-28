import { update } from "@tensorflow/tfjs-layers/dist/variables";
import React from "react";
const MicRecorder = require("mic-recorder-to-mp3");

function Demo() {
  const [newBlob, updateNewBlob] = React.useState(null);
  const startButton = {
    inner:{
      "box-shadow": "inset 0px 0px 40px 5px rgba(0, 255, 255, 0.7)",
    },
    outer:{
      "box-shadow": "0px 0px 20px 5px rgba(0, 255, 255, 0.7)",
    },
  };
  const stopButton = {
    inner:{
      "box-shadow": "inset 0px 0px 40px 5px #c7ad70",
    },
    outer:{
      "box-shadow": "0px 0px 20px 5px #c7ad70",
    },
  }

  const [recorder] = React.useState(new MicRecorder({
    bitRate: 128,
  }));
  console.log(newBlob);
  function start() {
    recorder
      .start()
      .then(() => {
        // toggler();
        updateNewBlob(-1);
        console.log('a');
      })
      .catch((e) => {
        console.error(e);
      });
  }
  function stop() {
    //console.log("a");
    recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        // toggler();
        console.log("aa");
        const newBlob = new Blob([blob], { type: "audio/mp3; codecs=0" });
        const file = new File(buffer, "music.mp3", {
          type: newBlob.type,
          lastModified: Date.now(),
        });
        var data = new FormData();
        data.append("file", newBlob, "file");
        const url = URL.createObjectURL(file);
        const link = document.createElement("a");
        link.href = url;
        link.download = "file.mp3";
        //link.click();
        console.log(blob);
        updateNewBlob(blob);
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
  function handleClick() {
    //console.log(startButton);
    if (newBlob !== -1) {
      start();
    } else {
      stop();
    }
  }
  return (
    <div className="circle-wrapper">
      <div className="circle1" onClick={handleClick} style={newBlob!==-1 ? startButton.outer : stopButton.outer}>
        <div className="circle2" style={newBlob!==-1 ? startButton.inner : stopButton.inner}>
        <h2>{newBlob!==-1 ? "Start" : "Stop"}</h2>
        </div>
      </div>
    </div>
  );
}

export default Demo;
