import { useState } from "react";
import Button from "./Button";
import Dice from "./Dice";
import HandButton from "./HandButton";
import HandIcon from "./HandIcon";
import { compareHand, generateRandomHand } from './util';

const  INITIAL_VALUE = 'rock';

function getResult(me, other) {
  const comparison = compareHand(me, other);
  if (comparison > 0) return '승리';
  if (comparison < 0) return '패배';
  return '무승부';
}

function App(){
    const [hand, setHand]= useState(INITIAL_VALUE);
    const [otherHand, setOtherHand]= useState(INITIAL_VALUE);
    const [gameHistory, setGameHistory] = useState([]);
    const [score, setScore] = useState(0);
    const [otherScore, setOtherScore] = useState(0);
    const [bet, setBet] = useState(1);

    const handleButtonClick = (nextHand) => {
        const nextOtherHand = generateRandomHand();
        const nextHistoryItem = getResult(nextHand, nextOtherHand);
        const comparison = compareHand(nextHand, nextOtherHand);
        setHand(nextHand);
        setOtherHand(nextOtherHand);
        setGameHistory([...gameHistory, nextHistoryItem]); //배열로!!!

        //parseInt 대신에 Number() 생성자로 처음부터 넘겨주기 가능함
        if (comparison > 0) setScore(score + bet);
        if (comparison < 0) setOtherScore(otherScore + bet);
    };

    const handleClearClick = () => {
        setHand(INITIAL_VALUE);
        setOtherHand(INITIAL_VALUE)
        // gameHistory를 비워주세요
        setGameHistory([]);
        setScore(0);
        setOtherScore(0);
        setBet(1);
    };

    const handleBetChange = (e) => {
        // if(e.target.value === '')
        //     setBet(5);
        // if(!(0 < e.target.value || e.target.value < 10)) {
            //     setBet(9)
            //     return
            // };

        let num = Number(e.target.value); //정수 문자열의 빈 문자열은 0임
        if(num > 9) num %= 10;
        if(num < 1) num = 1;
        num = Math.floor(num);
        setBet(num);
      };

    return (
    <div>
        <Button onClick={handleClearClick}>
            처음부터
        </Button>
        <p>{getResult(hand, otherHand)}</p>
        <div>
            {score} : {otherScore}
        </div>
        <div>
            <HandIcon value={hand} />
            VS
            <HandIcon value={otherHand} />
        </div>
        <div>
            <input onChange={handleBetChange} type="number" value={bet} min={1} max={9}></input>
        </div>
        <p>
            승부 기록: {gameHistory.join(', ')}
        </p>
        <div>
            <HandButton value="rock" onClick={handleButtonClick} />
            <HandButton value="scissor" onClick={handleButtonClick} />
            <HandButton value="paper" onClick={handleButtonClick} />
        </div>
    </div>
);
}

export default App;