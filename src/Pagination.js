import React, { useState, useEffect } from "react";
import Todoitem from "./Todoitem";

function Pagination(props) {
  const displayItem = props.todos.map((todo, index) => (
    <Todoitem
      key={index}
      {...todo}
      changeStatus={props.changeStatus}
      deleteItem={props.deleteItem}
    />
  ));
  return <>{displayItem}</>;
}

export default Pagination;
