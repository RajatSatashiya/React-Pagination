import React from "react";

function Todoitem(props) {
  const handle = (e) => {
    e.stopPropagation();
    console.log("clicked");
    props.deleteItem(props.id);
  };
  return (
    <div
      className={props.status ? "todoitem done" : "todoitem"}
      onClick={() => props.changeStatus(props.id)}
    >
      {props.text}
      <button onClick={handle} className="btn">
        Delete
      </button>
    </div>
  );
}

export default Todoitem;
