const easy = [
    "--2--81---4--59-6-153----8951-42---37---6-----2-5-18-7--1--49---3-7--2-4-8--12736",
    "962348175847159362153276489518427693794863521326591847271634958639785214485912736"
];

const medium = [
    "4---8-------5----7289-----57439-62-------2-6---2-7---9635-2---492145--86-------1-",
    "457281693316594827289763145743916258598342761162875439635128974921457386874639512"
];

const hard = [
    "---9-3---1---6-5----4------3492---56--2-----9----8---2-1---2--5-9614--3-------4-8",
    "865913724127864593934527681349271856782356149651489372418732965596148237273695418"
];

let selectedNum;
let selectedTile;
let disableSelect;

const startBtn = document.getElementById("start-btn");
const easyBtn = document.getElementById("diff-easy");
const mediumBtn = document.getElementById("diff-medium");
const hardBtn = document.getElementById("diff-hard");
const numContainer = document.querySelector(".number-container");
const sudokuBoard = document.querySelector(".sudoku-board");
const winMessage = document.querySelector(".winning-message");

const clearPrevious = () => {
    let tiles = document.querySelectorAll(".tile");
    for (let i = 0; i < tiles.length; i++) {
        tiles[i].remove();
    }

    for (let i = 0; i < numContainer.children.length; i++) {
        numContainer.children[i].classList.remove("selected");
    }

    selectedNum = null;
    selectedTile = null;
}

const checkCorrect = (tile) => {
    let solution;
    if (easyBtn.checked) {
        solution = easy[1];
    } else if (mediumBtn.checked) {
        solution = medium[1];
    } else {
        solution = hard[1];
    }

    if (solution.charAt(tile.id) === tile.textContent) {
        return true;
    } else {
        return false;
    }
}

const checkNumDone = () => {
    let numCount = 0;
    let tiles = document.querySelectorAll(".tile");
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i].textContent === selectedNum.textContent) {
            numCount++;
        }
    }

    if (numCount == 9) {
        return true;
    } else {
        return false;
    }
}

const checkDone = () => {
    let tiles = document.querySelectorAll(".tile");
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i].textContent === "") {
            return false;
        }
    }
    return true;
}

const endGame = () => {
    disableSelect = true;
    winMessage.classList.remove("hidden");
    let tiles = document.querySelectorAll(".tile");
    for (let i = 0; i < tiles.length; i++) {
        tiles[i].classList.remove("highlighted");
    }
}

const updateMove = () => {
    if (selectedTile && selectedNum) {
        selectedTile.textContent = selectedNum.textContent;
        selectedTile.classList.add("highlighted");
        selectedTile.classList.add("filled");
        if (checkCorrect(selectedTile)) {
            let filledTile = selectedTile.cloneNode(true);
            selectedTile.parentNode.replaceChild(filledTile, selectedTile);
            
            if (checkNumDone()) {
                selectedNum.classList.add("hidden");
                selectedNum = null;
            }
            
            selectedTile = null;

            if (checkDone()) {
                endGame();
            }
        } else {
            disableSelect = true;
            selectedTile.classList.remove("highlighted");
            selectedTile.classList.add("incorrect");

            setTimeout(() => {
                disableSelect = false;
                selectedTile.classList.remove("incorrect");
                selectedTile.textContent = "";
                selectedTile = null;
            }, 1000);
        }
    }
}

const generateBoard = (board) => {
    clearPrevious();

    let idCount = 0;
    for (let i = 0; i < 81; i++) {
        let tile = document.createElement("p");

        if (board.charAt(i) != "-") {
            tile.textContent = board.charAt(i);
        } else {
            tile.addEventListener("click", () => {
                if (!disableSelect) {
                    if (tile.classList.contains("highlighted")) {
                        tile.classList.remove("highlighted");
                        selectedTile = null;
                    } else {
                        if (selectedNum == null) {
                            for (let i = 0; i < 81; i++) {
                                document.querySelectorAll(".tile")[i].classList.remove("highlighted");
                            }
                        }
                        tile.classList.add("highlighted");
                        selectedTile = tile;
                        updateMove();
                    }
                }
            });
        }

        tile.id = idCount;
        idCount++;

        tile.classList.add("tile");
        if ((tile.id > 17 && tile.id < 27) || (tile.id > 44 & tile.id < 54)) {
            tile.classList.add("bottom-border");
        }
        if ((tile.id + 1) % 9 == 3 || (tile.id + 1) % 9 == 6) {
            tile.classList.add("right-border");
        }

        sudokuBoard.appendChild(tile);
    }
}

const startGame = () => {
    startBtn.innerText = "New Game";

    let board;
    if (easyBtn.checked) {
        board = easy[0];
    } else if (mediumBtn.checked) {
        board = medium[0];
    } else {
        board = hard[0];
    }

    disableSelect = false;
    winMessage.classList.add("hidden");
    generateBoard(board);
    numContainer.classList.remove("hidden");
    for (let i = 0; i < 9; i++) {
        numContainer.children[i].classList.remove("hidden");
    }
}

window.onload = () => {
    startBtn.addEventListener("click", startGame);

    for (let i = 0; i < numContainer.children.length; i++) {
        numContainer.children[i].addEventListener("click", () => {
            let tiles = document.querySelectorAll(".tile")
            if (!disableSelect) {
                if (numContainer.children[i].classList.contains("selected")) {
                    numContainer.children[i].classList.remove("selected");
                    selectedNum = null;
                    for (let i = 0; i < 81; i++) {
                        tiles[i].classList.remove("highlighted");
                    }
                } else {
                    for (let i = 0; i < 9; i++) {
                        numContainer.children[i].classList.remove("selected");
                    }
                    for (let i = 0; i < 81; i++) {
                        tiles[i].classList.remove("highlighted");
                    }
                    numContainer.children[i].classList.add("selected");
                    selectedNum = numContainer.children[i];
                    for (let i = 0; i < 81; i++) {
                        if (tiles[i].textContent === selectedNum.textContent) {
                            tiles[i].classList.add("highlighted");
                        }
                    }
                    updateMove();
                }
            }
        });
    }
}