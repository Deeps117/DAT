import React from "react";
import AudioReactRecorder, { RecordState } from "audio-react-recorder";
// const MicRecorder = require('mic-recorder-to-mp3');
const Recorder = () => {
  const [recordState, updateRecordState] = React.useState(null);
  const [toggle, updateToggle] = React.useState(false);
  const [pressStart, updatePressStart] = React.useState(false);

  function handleStart(){
    start();
    updatePressStart(true);
    updateToggle(!toggle);
  }
  function handleStop(){
    stop();
    updatePressStart(false);
  }

  React.useEffect(()=>{
    if(pressStart){
      start();
     const timer = setTimeout(()=>{
       stop();
       updateToggle(!toggle);
     }, 3000);
    }
  }, [toggle])

  function start() {
    updateRecordState(RecordState.START);
  }

  function stop() {
    updateRecordState(RecordState.STOP);
  }
  
  async function onStop(audioData) {
    const link = document.createElement('a');
    link.href = audioData.url;
    link.download = "recorded_auido.wav";
    console.log(Object.getPrototypeOf(new Blob([Object.getPrototypeOf(audioData.blob)], {type: "audio/wav"})));
    console.log("audioData", audioData);
  }

  return (
    <div>
      <div>
        <AudioReactRecorder state={recordState} onStop={onStop} />
        <button onClick={handleStart} >Start</button>
        <button onClick={handleStop}>Stop</button>
      </div>
    </div>
  );
};

export default Recorder;
