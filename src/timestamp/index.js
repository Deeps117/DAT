import React from "react";

function Form(props) {
  const show = {
    display: "flex",
  };
  const hide = {
    display: "none",
  };
  function handleChange(e){
    const { name, value } = e.target;
    props.handleChange(name, Number(value));
  }
  function handleSubmit(e){
    props.updateShow(false);
    e.preventDefault();
  }
  return (
    <div className="form-wrapper" style={props.show ? show : hide}>
      <div className="form-wrapper-inner">
        <form>
          <h3>Time Stamps</h3>
          <div className="form-group">
            <label for="left">Left</label>
            <input type="Number" name="left" value={props.left} className="form-control" id="left" onChange={ e => handleChange(e)}/>
          </div>
          <div className="form-group">
            <label for="right">Right</label>
            <input type="Number" name="right" value={props.right } className="form-control" id="right" onChange={ e => handleChange(e)}/>
          </div>
          <div className="form-group">
            <label for="top">Top</label>
            <input type="Number" name="top" value={props.top} className="form-control" id="top" onChange={ e => handleChange(e)}/>
          </div>
          <div className="form-group">
            <label for="bottom">Bottom</label>
            <input type="Number" name="bottom" value={props.bottom } className="form-control" id="bottom" onChange={ e => handleChange(e)}/>
          </div>
          <button type="submit" className="btn btn-primary" onClick={ e => handleSubmit(e)}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;
