import React from "react";

function Todoitem(props) {
  return (
    <div
      className={props.status ? "todoitem done" : "todoitem"}
      onClick={() => props.changeStatus(props.id)}
    >
      <div>
        {props.text} {props.status ? "true" : "false"}
      </div>
    </div>
  );
}

export default Todoitem;
