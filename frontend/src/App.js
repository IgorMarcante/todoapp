import "./App.css";
import { useState, useEffect } from "react";
import Item from "./components/item";
function App() {
  const [itens, setItens] = useState([]);
  const [filterItens, setFilterItens] = useState({
    filter: false,
    active: false,
  });

  function getData() {
    fetch("http://localhost:3000/todo/list", { method: "GET" })
      .then((response) => response.json())
      .then((data) => setItens(data));
  }

  function insertDocument() {
    fetch("http://localhost:3000/todo/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: "", active: true }),
    })
      .then((response) => response.json())
      .then(() => getData());
  }

  function updateDocument(item) {
    fetch("http://localhost:3000/todo/update", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
      .then(() => getData());
  }

  function deleteDocument(item) {
    fetch("http://localhost:3000/todo/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    }).then((response) => getData());
  }

  useEffect(() => {
    getData();
  }, []);

  const itensToShow = filterItens.filter
    ? itens.filter((item) => item.active === filterItens.active)
    : itens;

  return (
    <div className="wrapper">
      <div className="to-do-list">
        <h1> To DO </h1>

        {itensToShow.map((item) => {
          return (
            <Item
              item={item}
              updateDocument={updateDocument}
              deleteDocument={deleteDocument}
            />
          );
        })}
        <div className="buttonRow">
          <button onClick={() => setFilterItens({ filter: false })}>
            Todos
          </button>
          <button
            onClick={() => setFilterItens({ filter: true, active: true })}
          >
            Pendentes
          </button>
          <button
            onClick={() => setFilterItens({ filter: true, active: false })}
          >
            Concluídos
          </button>
        </div>
        <div className="buttonRow">
          <button onClick={insertDocument}>Inserir novo To-Do</button>
        </div>
      </div>
    </div>
  );
}

export default App;
