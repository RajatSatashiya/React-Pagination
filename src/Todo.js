import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";

function Todo() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errmsg, setErrmsg] = useState("");
  const [text, setText] = useState("");
  const [id, setId] = useState(12);

  const [page, setPage] = useState(1);
  const [todos, setTodos] = useState([]);

  const changeStatus = async (id) => {
    try {
      //get currentStatus -> get request
      const res = await fetch(`http://localhost:3000/list/${id}`);
      const currentStatus = await res.json();

      //update the status
      const response = await fetch(`http://localhost:3000/list/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          status: !currentStatus.status,
        }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });
      const data = await response.json();
      console.log(data);

      var value = todos.map((item) => {
        if (item.id === id) {
          item.status = !currentStatus.status;
        }
        return item;
      });
      setTodos(value);
    } catch (e) {
      console.log("Error");
    }
  };

  const changePage = (sign) => {
    //+1 -> next page, -1 -> prev page
    if (sign == 1) {
      if (page != 3) {
        setPage((page) => page + sign);
        setError(false);
      } else {
        setError(true);
        setErrmsg("Error: Max page limit reached!!! You are on final page");
      }
    } else {
      if (page != 1) {
        setPage((page) => page + sign);
        setError(false);
      } else {
        setError(true);
        setErrmsg("Error: Can't navigate to previous page. You are on page-1");
      }
    }
  };

  //get request
  const getTODOlist = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/list?_page=${page}&_limit=5`
      );
      setLoading(false);

      const data = await response.json();
      setTodos(data);
    } catch (e) {
      // console.log("error");
      setError(true);
      setErrmsg("Error while fetching the data");
    }
  };

  //post request
  const postTodo = async () => {
    try {
      const response = await fetch(`http://localhost:3000/list`, {
        method: "POST",
        body: JSON.stringify({
          text: text,
          status: false,
          id: id,
        }),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });
      const data = await response.json();
      setId(id + 1);
      console.log(data);
    } catch (e) {
      setError(true);
      setErrmsg("Error while creating an item.");
    }
  };

  const handleFunction = (e) => {
    setText(e.target.value);
  };

  useEffect(() => {
    getTODOlist();
  }, [page]);

  return (
    <>
      <div className="btns">
        <button onClick={() => changePage(-1)}>Prev Page</button>
        <button onClick={() => changePage(+1)}>Next Page</button>
      </div>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <Pagination page={page} todos={todos} changeStatus={changeStatus} />
      )}
      {/* <div className="circle red">Task Remaining</div>
      <div className="circle green">Task Completed</div> */}

      <div className="form">
        <input type="text" onChange={handleFunction} value={text}></input>
        <button onClick={postTodo}>ADD</button>
      </div>
      <div className="error">{error ? errmsg : ""}</div>
    </>
  );
}

export default Todo;
