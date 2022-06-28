import React from "react";
import Demo from "./Recorder/demo";
import Display from "./display";

function App() {
  return (
    <div>
      <div className="header-wrapper">
        <h1>Driving Assistive Tool</h1>
        <i className="fas fa-gear"></i>
      </div>
      <div className="recorder-wrapper">
        <Display />
        <Demo />
      </div>
    </div>
  );
}

export default App;
