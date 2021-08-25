import { useState } from "react";

function Item({ item, updateDocument, deleteDocument }) {
  const [tempText, setTempText] = useState("");

  return (
    <div className="row">
      <input
        type="checkbox"
        checked={!item.active}
        onClick={() => {
          updateDocument({ ...item, active: !item.active });
        }}
      />

      {item.edit || item.text === "" ? (
        <input
          type="text"
          placeholder={item.text}
          onBlur={() => {
            updateDocument({ ...item, text: tempText, edit: false });
          }}
          onChange={(e) => {
            setTempText(e.target.value);
          }}
        />
      ) : (
        <span
          onClick={() => {
            updateDocument({ ...item, edit: true });
          }}
          style={item.active ? {} : {textDecoration: "line-through"} }
        >
          {item.text}
        </span>
      )}
      <button
        onClick={() => {
          deleteDocument(item);
        }}
      >
        Apagar
      </button>
    </div>
  );
}

export default Item;
