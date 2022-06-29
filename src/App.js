import React from "react";
import Demo from "./Recorder/demo";
import Display from "./display";
import Form from "./timestamp";
import Recorder from "./Recorder";

function App() {
  const [isActive, updateIsActive] = React.useState(false);
  const [show, updateShow] = React.useState(false);
  const [formInput, updateFormInput] = React.useState({left: 0, right: 0, top: 0, bottom:0});
  function handleChange(name, value){
    updateFormInput(prevValue => {
      return {
        ...prevValue,
        [name]: value,
      }
    })
  }
  return (
    <div>
      <div className="header-wrapper">
        <h1>Driving Assistive Tool</h1>
        <i className="fas fa-gear" onClick={() => updateShow(!show)}></i>
      </div>
      <div className="recorder-wrapper">
        <Form show={show}
        handleChange = {handleChange}
        updateShow={updateShow}
        />
        <Display 
        formInput={ formInput }
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
