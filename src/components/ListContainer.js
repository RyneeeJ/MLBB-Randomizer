import ListItem from "./ListItem";

export default function ListContainer({
  isAddingPlayer,
  onRemovePlayer,
  players,
  onInputName,
  roleClass,
  isHeroGenerated,
}) {
  return (
    <div className="list-container">
      {isAddingPlayer && (
        <ul className="list">
          {players.map((player, i) => (
            <ListItem
              key={player.id}
              type="input"
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
              <ListItem type="name" key={player.id}>
                {player.userName}
              </ListItem>
            ))}
          </ul>

          {isHeroGenerated && (
            <ul className="list">
              {players.map((player) => (
                <ListItem
                  type="hero"
                  key={player.id}
                  imgSrc={player.heroImage}
                  heroName={player.heroName}
                />
              ))}
            </ul>
          )}
          <ul className="list">
            {players.map((player) => (
              <ListItem type="role" key={player.id} roleClass={roleClass}>
                {player.role}
              </ListItem>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
