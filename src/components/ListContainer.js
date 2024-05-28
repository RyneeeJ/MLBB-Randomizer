import ListItem from "./ListItem";

export default function ListContainer({
  isAddingPlayer,
  onRemovePlayer,
  players,
  onInputName,
  roleListClass,
}) {
  return (
    <div className="list-container">
      {isAddingPlayer && (
        <ul className="list">
          {players.map((player, i) => (
            <ListItem
              key={player.id}
              type="Input"
              isAddingPlayer={isAddingPlayer}
              onRemovePlayer={() => onRemovePlayer(player.id)}
              id={player.id}
              name={player.userName}
              onInputName={onInputName}
              label={`Player ${i + 1}`}
            />
          ))}
        </ul>
      )}

      {!isAddingPlayer && (
        <>
          <ul className="list">
            {players.map((player) => (
              <ListItem type="Name" key={player.id}>
                {player.userName}
              </ListItem>
            ))}
          </ul>
          <ul className={roleListClass}>
            {players.map((player) => (
              <ListItem type="Role" key={player.id}>
                {player.role}
              </ListItem>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
