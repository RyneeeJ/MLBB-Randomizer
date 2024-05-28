import { useEffect, useRef } from "react";
import ListItem from "./ListItem";

export default function ListContainer({
  isAddingPlayer,
  onRemovePlayer,
  players,
  onToggleEdit,
  onSaveName,
}) {
  // Store id of player's active (selected) input
  const selectedInput = useRef("");
  useEffect(
    function () {
      selectedInput.current = players.find(
        (player) => player.isEditing === true
      )?.id;
    },
    [players]
  );

  useEffect(function () {
    document.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        console.log(selectedInput.current);
      }
    });
  }, []);
  return (
    <div className="list-container">
      <ul className="list">
        {players.map((player) => (
          <ListItem
            type="Name"
            key={player.id}
            isAddingPlayer={isAddingPlayer}
            onRemovePlayer={() => onRemovePlayer(player.id)}
            isEditing={player.isEditing}
            onToggleEdit={onToggleEdit}
            onSaveName={onSaveName}
            id={player.id}
          />
        ))}
      </ul>

      {!isAddingPlayer && (
        <ul className="list">
          {players.map((player) => (
            <ListItem type="Role" key={player.id} role={player.role} />
          ))}
        </ul>
      )}
    </div>
  );
}
