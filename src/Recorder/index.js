import React, { Component } from "react";

import AudioReactRecorder, { RecordState } from "audio-react-recorder";

const Recorder = () => {
  const [recordState, updateRecordState] = React.useState(null);

  function start() {
    updateRecordState(RecordState.START);
  }

  function stop() {
    updateRecordState(RecordState.STOP);
  }

  function onStop(audioData) {
    const link = document.createElement('a');
    link.href = audioData.url;
    link.download = "recorded_auido.wav";
    link.click();
    console.log("audioData", audioData);
  }

  return (
    <div>
      <div>
        <AudioReactRecorder state={recordState} onStop={onStop} />

        <button onClick={start}>Start</button>
        <button onClick={stop}>Stop</button>
      </div>
    </div>
  );
};

export default Recorder;
