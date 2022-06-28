import React from "react";

function Display(props) {
  const activeStyle={
    "filter": "drop-shadow(4px 2px 4px #0bda71)",
    "color": "#0bda71",
  }
  return (
    <div className="display-wrapper">
      <div className="top-icon-wrapper">
        <i className="fas fa-arrow-up" style={props.formInput.top >= props.formInput.bottom && props.isActive ? activeStyle : null}></i>
      </div>
      <div className="middle-icons-wrapper">
        <i className="fas fa-arrow-left" style={props.formInput.left >= props.formInput.right && props.isActive ? activeStyle : null}></i>
        <i className="fas fa-bullhorn" style={props.isActive ? activeStyle : null}></i>
        <i className="fas fa-arrow-right" style={props.formInput.right >= props.formInput.left && props.isActive ? activeStyle : null}></i>
      </div>
      <div className="bottom-icon-wrapper">
        <i className="fas fa-arrow-down" style={props.formInput.top <= props.formInput.bottom && props.isActive ? activeStyle : null}></i>
      </div>
    </div>
  );
}

export default Display;
