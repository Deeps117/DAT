import { update } from "@tensorflow/tfjs-layers/dist/variables";
import React from "react";
const MicRecorder = require("mic-recorder-to-mp3");

function Demo(props) {
  const [newBlob, updateNewBlob] = React.useState(null);
  const [didStart, updateDidStart] = React.useState(false);
  const startButton = {
    inner:{
      "boxShadow": "inset 0px 0px 40px 5px rgba(0, 255, 255, 0.7)",
    },
    outer:{
      "boxShadow": "0px 0px 20px 5px rgba(0, 255, 255, 0.7)",
    },
  };
  const stopButton = {
    inner:{
      "boxShadow": "inset 0px 0px 60px 20px rgba(0, 255, 255, 0.7)",
    },
    outer:{
      "boxShadow": "0px 0px 40px 30px rgba(0, 255, 255, 0.7)",
    },
  }

  const [recorder] = React.useState(new MicRecorder({
    bitRate: 128,
  }));
  //console.log(newBlob);
  function start() {
    recorder
      .start()
      .then(() => {
        // toggler();
        updateNewBlob(-1);
        props.updateIsActive(false);
        console.log('a');
        setTimeout(() => {
          stop();
        }, 2000);
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
        const newBlob = blob;
        var data = new FormData();
        data.append("file", newBlob, "file");
        console.log(blob);
        updateNewBlob(blob);
        // props.updateIsActive(true);
        console.log(data);
        start(); //move under line 66
        fetch("http://127.0.0.1:5000/receive", {
          method: "POST",
          body: data,
        })
          .then((response) => response.json())
          .then((json) => {
            props.updateIsActive(json.horn === 1);
          });
      })
      .catch((e) => {
        alert("We could not retrieve your message");
        console.log(e);
      });
  }
  function handleClick() {
    //console.log(startButton);
    updateDidStart(true);
    start();
  }
  return (
    <div className="circle-wrapper">
      <div className="circle1" onClick={handleClick} style={!didStart ? startButton.outer : stopButton.outer}>
        <div className="circle2" style={!didStart ? startButton.inner : stopButton.inner}>
        <h2>{ !didStart ? "Start" : "Started" }</h2>
        </div>
      </div>
    </div>
  );
}

export default Demo;
