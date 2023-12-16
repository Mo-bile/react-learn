import diceBlue01 from './assets/dice-blue-1.svg';
import diceRed1 from './assets/dice-red-1.svg';

function Dice(props){
    console.log(props);
    const diceIgm = props.color === 'red' ? diceRed1 : diceBlue01;
    return <img src={diceIgm} alt="주사위" />;
}

export default Dice;