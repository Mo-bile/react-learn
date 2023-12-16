import Dice from "./Dice";
import HandIcon from "./HandIcon";


function App(){
    return (<div>
        {/* <Dice color="red" /> */}
        <button>
            <HandIcon value= 'rock' />
        </button>
        <HandIcon value= 'scissor' />
        <HandIcon value= 'paper' />

    </div>);
}

export default App;