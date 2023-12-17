import Button from "./Button";
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
    const handleClearClick = () => console.log('처음부터');
    return (
    <div>
        {/* props 을 안던져줘도 되는 방식으로 바뀜 */}
        <Button  onClick={handleClearClick} >
            처음부터!! 
        </Button>
        <HandButton value2="rock" onClick={handleClick} />
        <HandButton value2="scissor" onClick={handleClick} />
        <HandButton value2="paper" onClick={handleClick} />
    </div>
);
}

export default App;