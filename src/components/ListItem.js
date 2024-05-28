import aamon from "../imgs/hero-imgs/aamon.png";

export default function ListItem({
  type,
  isAddingPlayer,
  onRemovePlayer,
  id,
  onInputName,
  children,
  name,
  label,
}) {
  let item;
  if (type === "Input") {
    item = (
      <input
        type="text"
        placeholder="Name"
        className="name-input"
        value={name}
        onChange={(e) => onInputName(id, e.currentTarget.value)}
        id={label}
      />
    );
  } else if (type === "Role" || type === "Name") {
    item = <div className="player-info">{children}</div>;
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
          <label className="name-label" htmlFor={label}>
            <span>{label}</span>
          </label>
        )}

        {item}
        {isAddingPlayer && (
          <button onClick={onRemovePlayer} className="remove-player-btn">
            <span>Remove</span>
          </button>
        )}
      </div>
    </li>
  );
}
