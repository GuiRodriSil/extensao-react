import './key.css';
import { useState } from 'react';

const Key = () => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleButtonClick = () => {
        alert(`Você digitou: ${inputValue}`); 
    };

    return (
        <div className="Titulo">    
            <input
                type="text"
                className="Input"
                value={inputValue}
                onChange={handleInputChange}
                placeholder='BOTE ALGO FI DA MÃE'
            />
            <button class="button" onClick={handleButtonClick}>PESQUISAR</button>
        </div>
    );
};

export default Key;
