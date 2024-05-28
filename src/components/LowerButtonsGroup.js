import Button from "./Button";
export default function LowerButtonsGroup({
  isAddingPlayer,
  players,
  onGenerateRoles,
  onChangePlayers,
  onGenerateHeroes,
  setRoleListClass,
}) {
  function handleSetRoles() {
    setRoleListClass((prevClass) => `${prevClass} highlight`);

    onGenerateRoles();

    setTimeout(function () {
      setRoleListClass("list");
    }, 1000);
  }

  const primaryButton = isAddingPlayer ? "Generate Roles" : "Generate Heroes";
  return (
    <div className="lower-btns-grp">
      {!isAddingPlayer && (
        <Button className="btn-secondary" onClick={handleSetRoles}>
          Reset Roles
        </Button>
      )}

      {players.length > 0 && (
        <Button
          className="btn-primary"
          onClick={isAddingPlayer ? onGenerateRoles : onGenerateHeroes}
        >
          {primaryButton}
        </Button>
      )}

      {!isAddingPlayer && (
        <Button className="btn-secondary" onClick={onChangePlayers}>
          Change Players
        </Button>
      )}
    </div>
  );
}
