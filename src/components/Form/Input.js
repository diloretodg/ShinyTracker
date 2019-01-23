import React from "react";

export function Input(props) {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <button className="btn btn-outline-secondary" onClick={props.onClick} type="button">Button</button>
      </div>
      <input className="form-control"  {...props}/>
    </div>
  );
}
