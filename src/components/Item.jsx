import React, {memo} from "react";

const Item = memo(({x, y, data, setData, gameOver, setGameOver}) => {

    function nearBombCount(x, y) {
        let nearBombsCount = 0
        if (data[y - 1]?.[x - 1]?.isBomb) {
            nearBombsCount++
        }
        if (data[y - 1]?.[x]?.isBomb) {
            nearBombsCount++
        }
        if (data[y - 1]?.[x + 1]?.isBomb) {
            nearBombsCount++
        }
        if (data[y]?.[x - 1]?.isBomb) {
            nearBombsCount++
        }
        if (data[y]?.[x]?.isBomb) {
            nearBombsCount++
        }
        if (data[y]?.[x + 1]?.isBomb) {
            nearBombsCount++
        }
        if (data[y + 1]?.[x - 1]?.isBomb) {
            nearBombsCount++
        }
        if (data[y + 1]?.[x]?.isBomb) {
            nearBombsCount++
        }
        if (data[y + 1]?.[x + 1]?.isBomb) {
            nearBombsCount++
        }

        return nearBombsCount;
    }

    function checkTerritory(x, y) {
        if (data[y][x].value === null) {
            if (nearBombCount(x, y) === 0) {
                data[y][x].value = 0
                if (data[y - 1]?.[x]) {
                    checkTerritory(x, y - 1)
                }

                if (data[y + 1]?.[x]) {
                    checkTerritory(x, y + 1)
                }

                if (data[y]?.[x - 1]) {
                    checkTerritory(x - 1, y)
                }

                if (data[y]?.[x + 1]) {
                    checkTerritory(x + 1, y)
                }
            } else {
                data[y][x].value = nearBombCount(x, y)
            }
        }
    }

    const item = data[y][x]

    return (
        <div
            className={item.value !== null && item.value !== -1 ? "selected" : gameOver && item.isBomb ? "error" : undefined}
            onContextMenu={(e) => e.preventDefault()}
            onMouseDown={(e) => {
                e.preventDefault()

                // left click
                if (e.button === 0) {
                    if (item.value === null) {
                        if (item.isBomb) {
                            setGameOver(true)
                        } else {
                            checkTerritory(x, y)
                            setData([...data])
                        }
                    }
                }
                // middle click
                else if (e.button === 1) {
                    console.log('test')
                }
                // right click
                else if (e.button === 2) {
                    if (item.value === null) {
                        item.value = -1
                    } else if (item.value === -1) {
                        item.value = null
                    }
                    setData([...data])
                }
            }}
        >
            {/*{gameOver && item.isBomb && "X"}*/}
            {item.value > 0 && item.value}
            {item.value === -1 && <strong style={{color: "red"}}>!</strong> }
        </div>
    );
});

export default Item;
