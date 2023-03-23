const API_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
import { useState } from "react";
import "./cards.css";

function Card({
  visitedDogs,
  setVisitedDogs,
  bannedTemperaments,
  setBannedTemperaments,
}) {
  const [currentDog, setCurrentDog] = useState({
    breedName: "",
    imageURL: "",
    countryOrigin: "",
    temperament: "",
    description: "",
  });

  const makeQuery = () => {
    let query = `https://api.thedogapi.com/v1/images/search?api_key=live_CAqh4tDvfbSFnpYsDjQUXsqd069F7z36piaaHofco0m45LRReCD5JjhPQQP0pZc6&has_breeds=1`;
    if (bannedTemperaments.length > 0) {
      query += `&exclude_breeds=${bannedTemperaments.join(",")}`;
    }
    console.log("query", query);
    callAPI(query).catch(console.error);
  };

  const callAPI = async (query) => {
    const response = await fetch(query);
    const json = await response.json();

    if (json && json.length > 0) {
      const parsedJson = parseJson(json);

      console.log("json breed", parsedJson.breedName);
      if (containsBanned(parsedJson, bannedTemperaments)) {
        makeQuery();
      } else {
        setCurrentDog(parsedJson);
        setVisitedDogs([parsedJson, ...visitedDogs]);
      }
    } else {
      alert("Oops! Something went wrong with that query, let's try again!");
    }
  };

  const parseJson = (json) => {
    return {
      breedName: json[0].breeds[0].name,
      imageURL: json[0].url,
      countryOrigin: json[0].breeds[0].origin,
      temperament: json[0].breeds[0].temperament,
      description: json[0].breeds[0].description,
    };
  };

  const handleTemperamentClick = (temperament) => {
    if (bannedTemperaments.includes(temperament)) {
      setBannedTemperaments(bannedTemperaments.filter((t) => t !== temperament));
    } else {
      setBannedTemperaments([...bannedTemperaments, temperament]);
    }
  };
  const containsBanned = (json, bannedTemperaments) => {
    if (bannedTemperaments.some((temperament) => json.temperament.includes(temperament))) {
      return true;
    }
    return false;
  };

  const splitTemperament = (temperament) => {
    if (temperament) {
      const words = temperament.split(", ");
      return (
        <div className="temperamentContainer">
          {words.map((word, i) => (
            <button key={i} onClick={() => handleTemperamentClick(word)}>{word}</button>
            ))}
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="Card">
      <h1>Dog Facts!</h1>
      <h2>Discover all cute and interesting puppies</h2>

      {currentDog.breedName !== "" ? (
        <div className="main">
          <h3>{currentDog.breedName}</h3>
          <img
            className="screenshot"
            src={currentDog.imageURL}
            alt="Dog Image"
          />
          {splitTemperament(currentDog.temperament)}
          <br></br>
          <div>{currentDog.description}</div>
        </div>
      ) : (
        ""
      )}

      <button type="submit" className="nextButton" onClick={makeQuery}>
        Next Puppy 🐕
      </button>
    </div>
  );
}

export default Card;