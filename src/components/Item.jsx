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
        if(data[y][x].value === '') {
            if (nearBombCount(x, y) === 0) {
                data[y][x].value = ' '
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
            className={item.value && item.value !== '^' ? "selected" : undefined}
            onContextMenu={(e) => {
                e.preventDefault()

                if (!item.value) {
                    item.value = "^"
                } else if (item.value === "^") {
                    item.value = ""
                }
                console.log(item)
                setData([...data])
            }}
            onClick={() => {
                if (item.value === "") {


                    if (item.isBomb) {
                        setGameOver(true)
                    } else {
                        checkTerritory(x, y)
                        setData([...data])

                    }
                    // if (data[y][x]) {
                    //     paint(data, x, y)
                    //
                    //     setData([...data])
                    // }


                }
            }}

        >
            {(gameOver && item.isBomb ? "X" : item.value)}
            {/*{(item.isBomb ? "X" : item.value)}*/}
        </div>
    );
});

export default Item;