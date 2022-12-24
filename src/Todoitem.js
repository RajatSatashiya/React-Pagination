import React from "react";

function Todoitem(props) {
  return (
    <div className="todoitem">
      <div>{props.text}</div>
    </div>
  );
}

export default Todoitem;
