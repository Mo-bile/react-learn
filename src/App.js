import Dice from "./Dice";
import HandButton from "./HandButton";
import HandIcon from "./HandIcon";


function App(){
    // return (<div>
    //     {/* <Dice color="red" /> */}
    //     <HandButton value= 'rock' onClick={'rock'}/>
    //     <HandButton value= 'scissor' onClick={'scissor'}/>
    //     <HandButton value= 'paper' onClick={'paper'}/>
    // </div>);
    const handleClick = (value) => console.log(value);
    return (
    <div>
        <HandButton value2="rock" onClick={handleClick} />
        <HandButton value2="scissor" onClick={handleClick} />
        <HandButton value2="paper" onClick={handleClick} />
    </div>
);
}

export default App;