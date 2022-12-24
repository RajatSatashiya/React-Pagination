import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";

function Todo() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errmsg, setErrmsg] = useState("");

  const [page, setPage] = useState(1);
  const [todos, setTodos] = useState([]);

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
      console.log("error");
      setError(true);
    }
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
        <Pagination page={page} todos={todos} />
      )}
      <div className="error">{error ? errmsg : ""}</div>
    </>
  );
}

export default Todo;
