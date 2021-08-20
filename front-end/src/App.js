import React, { useState } from "react";
import Editor from "./components/Editor";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

const offCell = {
  on: false,
  color: "#000000",
};

const initialCells = Array.from({ length: 784 }, () => offCell);

function App() {
  const [cells, setCells] = useState(initialCells);
  const [currentColor] = useState("#000000");

  return (
    <div className={"App"}>
      <Editor cells={cells} setCells={setCells} currentColor={currentColor} />
      <h1 id="answer">?</h1>
    </div>
  );
}

export default App;
