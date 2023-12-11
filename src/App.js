import './App.css';
import Item from "./components/Item";
import {useCallback, useEffect, useState} from "react";

const ROWS_COUNT = 10;
const COLUMNS_COUNT = 10;
const BOMB_COUNT = 10

function createNewData() {
    let newData = []
    for (let y = 0; y < ROWS_COUNT; y++) {
        newData[y] = [];
        for (let x = 0; x < COLUMNS_COUNT; x++) {
            newData[y][x] = {
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

        if (!newData[randomY][randomX].isBomb) {
            newData[randomY][randomX].isBomb = true;
            bombCount++;
        }
    }

    return newData;
}

const defaultData = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : createNewData();

function App() {
    const [data, setData] = useState(defaultData)
    const [gameOver, setGameOver] = useState(false)
    const haveBomb = BOMB_COUNT - data.flat().filter(item=>item.value === '^').length


    const isWin = useCallback(() => {
        return data.flat().every(item => {
            if (item.value === '') {
                return false
            }
            if (item.value === '^') {
                return item.isBomb === true
            }
            if(item.value !== '^'){
                return item.isBomb === false
            }
            return true
        })
    }, [data])

    if (gameOver) {
        alert("game over")
    }

    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(data))
        if (gameOver) {
            createNewData();
        }

        if (isWin()) {
            alert('WIN')
        }
    }, [data, gameOver, isWin])

    // console.log(data)
    return (
        <div className="App">
            <div className="row">
                <button onClick={() => {
                    setData(createNewData())
                    setGameOver(false)
                }}>Reset
                </button>
                <h5>{haveBomb}</h5>
            </div>

            {
                Array.from({length: ROWS_COUNT}).map((_, y) => (
                    <div className="row" key={y}>
                        {
                            Array.from({length: COLUMNS_COUNT}).map((number, x) => (
                                <Item key={x} data={data} x={x} y={y} setData={setData} gameOver={gameOver}
                                      setGameOver={setGameOver}/>
                            ))
                        }
                    </div>
                ))
            }

        </div>
    );
}

export default App;
