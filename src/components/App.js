import { useState } from "react";
import Button from "./Button";
import CountdownModal from "./CountdownModal";
import Header from "./Header";
import ListContainer from "./ListContainer";
import LowerButtonsGroup from "./LowerButtonsGroup";

const roles = ["Jungler", "Mid laner", "Gold laner", "Exp laner", "Roamer"];

function generateRandomNumber(min, max) {
  const randomNum = Math.trunc(Math.random() * (max - min + 1) + min);
  return randomNum;
}

function randomizeSelection(totalNumResults, choicesArray) {
  let updatedArray = choicesArray;

  const resultsArr = [];
  for (let i = totalNumResults; i > 0; i--) {
    const index = generateRandomNumber(0, updatedArray.length - 1);
    const role = updatedArray[index];

    updatedArray = updatedArray.filter((_, i) => i !== index);
    resultsArr.push(role);
  }

  return resultsArr;
}

function App() {
  const [isAddingPlayer, setIsAddingPlayer] = useState(true);
  const [isGeneratingHero, setIsGeneratingHero] = useState(false);
  const [players, setPlayers] = useState([]);

  function handleAddPlayer() {
    if (players.length === 5) return;
    setPlayers((prevPlayers) => {
      const newPlayer = {
        userName: "",
        role: null,
        hero: null,
        id: Date.now(),
        isEditing: false,
      };

      return [...prevPlayers, newPlayer];
    });
  }

  function handleRemovePlayer(id) {
    setPlayers((prevPlayers) =>
      prevPlayers.filter((player) => player.id !== id)
    );
  }

  function handleEditName(id) {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => {
        return { ...player, isEditing: player.id === id ? true : false };
      })
    );
  }

  function handleSaveName(id, newName) {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => {
        return {
          ...player,
          userName: player.id === id ? newName : player.userName,
          isEditing: false,
        };
      })
    );
  }

  function handleGenerateRoles() {
    const isNameInvalid = players.some(
      (player) => player.userName.trim() === ""
    );

    const isStillEditing = players.some((player) => player.isEditing === true);
    // Check if all the players' names are confirmed
    if (isNameInvalid || isStillEditing) return;

    setIsAddingPlayer(false);

    const selectedRoles = randomizeSelection(players.length, roles);

    setPlayers((prevPlayers) =>
      prevPlayers.map((player, i) => {
        return { ...player, role: selectedRoles[i] };
      })
    );
  }

  function handleChangePlayers() {
    setIsAddingPlayer(true);
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => {
        return { ...player, role: undefined };
      })
    );
  }

  function handleGenerateHeroes() {
    setIsGeneratingHero(true);
  }

  function handleStopTimer() {
    setIsGeneratingHero(false);
  }

  return (
    <div className="container">
      <Header />
      <main className="main-content">
        {isAddingPlayer && (
          <Button className="btn-primary" onClick={handleAddPlayer}>
            + Add Player
          </Button>
        )}
        <ListContainer
          onRemovePlayer={handleRemovePlayer}
          isAddingPlayer={isAddingPlayer}
          players={players}
          onToggleEdit={handleEditName}
          onSaveName={handleSaveName}
        />
        <LowerButtonsGroup
          isAddingPlayer={isAddingPlayer}
          players={players}
          onGenerateRoles={handleGenerateRoles}
          onChangePlayers={handleChangePlayers}
          onGenerateHeroes={handleGenerateHeroes}
        />
      </main>
      {isGeneratingHero && <CountdownModal onStopTimer={handleStopTimer} />}
    </div>
  );
}

export default App;
