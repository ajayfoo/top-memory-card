import { useEffect, useState } from "react";
import Grid from "./components/Grid";
import { getPokemonCardInfo } from "./utils";
import Score from "./components/Score";

const NUM_OF_CARDS = 15;

function App() {
  const [pokemonInfos, setPokemonInfos] = useState([]);
  const [selectedCardIds, setSelectedCardIds] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  useEffect(() => {
    const populatePokemonInfos = async () => {
      const temp = [];
      for (let i = 1; i <= NUM_OF_CARDS; ++i) {
        const info = await getPokemonCardInfo(i);
        temp.push(info);
      }
      setPokemonInfos(temp);
    };
    populatePokemonInfos();
  }, []);

  const handleClick = (id) => {
    setPokemonInfos(
      pokemonInfos
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
    );
    if (selectedCardIds.includes(id)) {
      setSelectedCardIds([]);
      setBestScore(score > bestScore ? score : bestScore);
      setScore(0);
    } else {
      setSelectedCardIds([...selectedCardIds, id]);
      setScore(score + 1);
    }
  };
  console.log(selectedCardIds);
  return (
    <>
      <Score score={score} bestScore={bestScore} />
      <Grid onCellClick={handleClick} infos={pokemonInfos} />;
    </>
  );
}

export default App;
