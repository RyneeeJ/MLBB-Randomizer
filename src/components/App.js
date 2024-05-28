import { useState } from "react";
import Button from "./Button";
import CountdownModal from "./CountdownModal";
import Header from "./Header";
import ListContainer from "./ListContainer";
import LowerButtonsGroup from "./LowerButtonsGroup";
import { heroes, roleCategory } from "../heroData";

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
  const [isHeroGenerated, setIsHeroGenerated] = useState(false);
  const [players, setPlayers] = useState([]);
  const [roleClass, setRoleClass] = useState("player-info");

  function handleAddPlayer() {
    if (players.length === 5) return;
    setPlayers((prevPlayers) => {
      const newPlayer = {
        userName: "",
        role: null,
        heroName: "",
        heroImage: null,
        id: Date.now(),
      };

      return [...prevPlayers, newPlayer];
    });
  }

  function handleRemovePlayer(id) {
    setPlayers((prevPlayers) =>
      prevPlayers.filter((player) => player.id !== id)
    );
  }

  function handleInputName(id, nameInput) {
    setPlayers((players) =>
      players.map((player) => {
        return {
          ...player,
          userName: player.id === id ? nameInput : player.userName,
        };
      })
    );
  }

  function handleGenerateRoles() {
    const isNameInvalid = players.some(
      (player) => player.userName.trim() === ""
    );
    // Check if all the players' names are confirmed
    if (isNameInvalid) return;

    setIsAddingPlayer(false);

    const selectedRoles = randomizeSelection(players.length, roles);

    setPlayers((prevPlayers) =>
      prevPlayers.map((player, i) => {
        return { ...player, role: selectedRoles[i] };
      })
    );

    setIsHeroGenerated(false);
  }

  function handleChangePlayers() {
    setIsAddingPlayer(true);
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => {
        return { ...player, role: undefined };
      })
    );

    setIsHeroGenerated(false);
  }

  function handleStopTimer() {
    setIsGeneratingHero(false);
  }

  function handleGenerateHeroes() {
    setIsGeneratingHero(true);
    const rolesArr = players.map((player) => player.role);

    const updatedRoleCategory = { ...roleCategory };

    // console.log(updatedRoleCategory);
    const selectedHeroArr = rolesArr.map((role) => {
      // Transformed the string for comparison
      const roleLowerCase = role.replace(" ", "").toLowerCase();
      // Generate random hero
      const randomHero = randomizeSelection(
        1,
        updatedRoleCategory[roleLowerCase]
      )[0];

      // Delete generated hero from role category array before randomization for the next role to avoid repetition of hero selected
      const entriesArr = Object.entries(updatedRoleCategory);

      // console.log(entriesArr);
      entriesArr.forEach(([role, heroArr]) => {
        const filteredArray = heroArr.filter((hero) => hero !== randomHero);
        updatedRoleCategory[role] = filteredArray;
      });

      return randomHero;
    });

    const selectedHeroImageArr = selectedHeroArr.map((randomizedHero) => {
      const heroObj = heroes.find((obj) => obj.hero === randomizedHero);

      return heroObj.image;
    });

    setPlayers((players) =>
      players.map((player, i) => {
        return {
          ...player,
          heroImage: selectedHeroImageArr[i],
          heroName: selectedHeroArr[i],
        };
      })
    );

    setIsHeroGenerated(true);
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
          onInputName={handleInputName}
          roleClass={roleClass}
          isHeroGenerated={isHeroGenerated}
        />
        <LowerButtonsGroup
          isAddingPlayer={isAddingPlayer}
          players={players}
          onGenerateRoles={handleGenerateRoles}
          onChangePlayers={handleChangePlayers}
          onGenerateHeroes={handleGenerateHeroes}
          setRoleClass={setRoleClass}
        />
      </main>
      {isGeneratingHero && <CountdownModal onStopTimer={handleStopTimer} />}
    </div>
  );
}

export default App;
