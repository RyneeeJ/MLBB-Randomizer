export default function ListItem({
  type,
  isAddingPlayer,
  onRemovePlayer,
  id,
  onInputName,
  children,
  name,
  label,
  roleClass,
  imgSrc,
  heroName,
}) {
  let item;
  if (type === "input") {
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
  } else if (type === "role") {
    item = <div className={roleClass}>{children}</div>;
  } else if (type === "name") {
    item = <div className="player-info">{children}</div>;
  } else if (type === "hero") {
    item = (
      <div className="list-row">
        <img
          className="hero-img"
          src={imgSrc}
          alt={`${heroName} from mobile legends`}
        />
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
