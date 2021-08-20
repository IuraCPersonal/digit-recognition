import React from "react";
import "./Editor.css";

const axios = require("axios");

const offCell = {
  on: false,
  color: "#000000",
};

const Editor = ({ currentColor, cells, setCells }) => {
  const updateCell = (i) => (e) => {
    e.preventDefault();
    if (e.buttons === 1 || e.buttons === 2) {
      setCells(
        cells.map((cell, cellIndex) => {
          if (cellIndex === i) {
            if (e.buttons === 1) {
              return {
                on: true,
                color: currentColor,
              };
            }
            return offCell;
          }
          return cell;
        })
      );
    }
  };

  const handleArray = () => {
    let temp = [];

    for (let i = 0; i < cells.length; ++i) {
      cells[i].on ? (temp[i] = 255) : (temp[i] = 0);
    }

    const newArr = [];

    for (let i = 0; i < temp.length; ++i) {
      newArr.push(temp.splice(0, 28));
    }

    return newArr;
  };

  const clearArray = () => {
    setCells(
      cells.map((cell) => {
        return 0;
      })
    );
  };

  const postAPI = () => {
    axios
      .post("http://localhost:8000/predict", { bitmap: handleArray() })
      .then(
        (response) =>
          (document.getElementById("answer").innerHTML = response.data.label)
      )
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <h1 className="nav-link">Digit Recognition AI</h1>
        <button onClick={postAPI} className="btn btn-primary">
          CHECK
        </button>
        <button onClick={clearArray} className="btn">
          CLEAR
        </button>
      </nav>

      <div className={"grid"}>
        {cells.map((cell, i) => (
          <div
            key={i}
            style={{ background: cell.on ? cell.color : "#ffffff" }}
            className={"cell"}
            onMouseOver={updateCell(i)}
            onMouseDown={updateCell(i)}
            onContextMenu={(e) => e.preventDefault()}
          />
        ))}
      </div>
    </div>
  );
};

export default Editor;
