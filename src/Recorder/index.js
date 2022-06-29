import React from "react";
import AudioReactRecorder, { RecordState } from "audio-react-recorder";
// const MicRecorder = require('mic-recorder-to-mp3');
const Recorder = (props) => {
  const [recordState, updateRecordState] = React.useState(null);
  const [toggle, updateToggle] = React.useState(false);
  const [pressStart, updatePressStart] = React.useState(true);
  const startButton = {
    inner: {
      boxShadow: "inset 0px 0px 40px 5px rgba(0, 255, 255, 0.7)",
    },
    outer: {
      boxShadow: "0px 0px 20px 5px rgba(0, 255, 255, 0.7)",
    },
  };
  const stopButton = {
    inner: {
      boxShadow: "inset 0px 0px 40px 5px #c7ad70",
    },
    outer: {
      boxShadow: "0px 0px 20px 5px #c7ad70",
    },
  };
  function handleStart() {
    start();
    updatePressStart(true);
    updateToggle(!toggle);
  }
  function handleStop() {
    stop();
    updatePressStart(false);
  }

  React.useEffect(() => {
    if (pressStart) {
      start();
      const timer = setTimeout(() => {
        stop();
        updateToggle(!toggle);
      }, 3000);
    }
  }, [toggle]);

  function start() {
    props.updateIsActive(false);
    updateRecordState(RecordState.START);
  }

  function stop() {
    //props.updateIsActive(true);
    updateRecordState(RecordState.STOP);
  }

  function onStop(audioData) {
    const link = document.createElement("a");
    link.href = audioData.url;
    link.download = "recorded_auido.wav";
    const blob = audioData.blob;
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
        props.updateIsActive(json.horn === 1);
      });
    console.log("audioData", audioData);
  }
  function handleClick() {
    if (pressStart) {
      start();
    } else {
      stop();
    }
    updatePressStart(!pressStart);
  }

  return (
    <div>
      <AudioReactRecorder
        state={recordState}
        onStop={onStop}
        backgroundColor="transparent"
      />
      <div className="circle-wrapper">
        <div
          className="circle1"
          onClick={handleClick}
          style={pressStart ? startButton.outer : stopButton.outer}
        >
          <div
            className="circle2"
            style={pressStart ? startButton.inner : stopButton.inner}
          >
            <h2>{pressStart ? "Start" : "Stop"}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recorder;
