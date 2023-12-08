import './App.css';
import Item from "./components/Item";
import {useState} from "react";

const ROWS_COUNT = 10;
const COLUMNS_COUNT = 10;
const BOMB_COUNT = 10
const defaultData = [];

for (let y = 0; y < ROWS_COUNT; y++) {
    defaultData[y] = [];
    for (let x = 0; x < COLUMNS_COUNT; x++) {
        defaultData[y][x] = {
            isBomb: false,
            value: ""
        };
    }
}

// Set "BOMB"
let bombCount = 0;
while (bombCount < BOMB_COUNT) {
    const randomY = Math.floor(Math.random() * ROWS_COUNT);
    const randomX = Math.floor(Math.random() * COLUMNS_COUNT);

    if (!defaultData[randomY][randomX].isBomb) {
        defaultData[randomY][randomX].isBomb = true;
        bombCount++;
    }
}

function App() {
    const [data, setData] = useState(defaultData)
    const [gameOver, setGameOver] = useState(false)

    if(gameOver){
        alert("game over")
    }

    console.log(data)
    return (
        <div className="App">
            {
                Array.from({length: ROWS_COUNT}).map((_, y) => (
                    <div className="row" key={y}>
                        {
                            Array.from({length: COLUMNS_COUNT}).map((number, x) => (
                                <Item key={x} data={data} x={x} y={y} setData={setData} gameOver={gameOver} setGameOver={setGameOver}/>
                            ))
                        }
                    </div>
                ))
            }

        </div>
    );
}

export default App;
