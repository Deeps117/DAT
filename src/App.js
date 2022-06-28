import React from "react";
import Demo from "./Recorder/demo";
import Display from "./display";

function App() {
  const [isActive, updateIsActive] = React.useState(false);
  return (
    <div>
      <div className="header-wrapper">
        <h1>Driving Assistive Tool</h1>
        <i className="fas fa-gear"></i>
      </div>
      <div className="recorder-wrapper">
        <Display 
        isActive = {isActive}
        />
        <Demo 
        updateIsActive = {updateIsActive}
        />
      </div>
    </div>
  );
}

export default App;
