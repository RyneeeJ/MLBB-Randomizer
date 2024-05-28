import { useEffect, useRef } from "react";
import aamon from "../imgs/hero-imgs/aamon.png";

export default function ListItem({
  type,
  isAddingPlayer,
  onRemovePlayer,
  isEditing,
  onToggleEdit,
  onSaveName,
  id,
  role = undefined,
}) {
  const nameInputEl = useRef(null);

  function handleClick(id, newName) {
    if (isEditing) {
      onSaveName(id, newName);
    } else onToggleEdit(id);
  }

  // auto focus on current input element when editing
  useEffect(
    function () {
      if (!isEditing) return;
      nameInputEl.current.focus();
    },
    [isEditing]
  );

  let item;
  if (type === "Name") {
    item = (
      <input
        type="text"
        placeholder="Name"
        className="name-input"
        disabled={!isEditing}
        ref={nameInputEl}
      />
    );
  } else if (type === "Role") {
    item = <div className="player-info">{role}</div>;
  } else if (type === "Hero") {
    item = (
      <div className="list-row">
        <img className="hero-img" src={aamon} alt="aamon from mobile legends" />
      </div>
    );
  }

  return (
    <li>
      <div className="list-row">
        {isAddingPlayer && (
          <button className="name-options-btn">
            <span onClick={() => handleClick(id, nameInputEl.current.value)}>
              {isEditing ? "Confirm" : "Edit"}
            </span>
          </button>
        )}

        {item}
        {isAddingPlayer && (
          <button onClick={onRemovePlayer} className="name-options-btn">
            <span>Remove</span>
          </button>
        )}
      </div>
    </li>
  );
}
