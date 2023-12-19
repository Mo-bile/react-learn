import HandIcon from "./HandIcon";
import purpleImage from './assets/purple.svg'

const HandButtonStyle = {
    width: '166px',
    height: '166px',
    border: 'none',
    outline: 'none',
    textAlign: 'center',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    backgroundImage: `url(${purpleImage})`, //이런식으로 넣어주어야함
    backgroundRepeat: "no-repeat",
    backgroundPosition: 'center',
    backgroundSize: 'contain'
};

function HandButton({ value, onClick }) {
    const handleClick = () => onClick(value);
    return (
        <button style={HandButtonStyle} onClick={handleClick}>
            <HandIcon value={value}/>
        </button>);
  }
  export default HandButton;