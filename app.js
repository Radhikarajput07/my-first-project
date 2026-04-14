let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0 = true; //playerX, player0

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = () => {
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0) {
            //player0
            box.innerText = "0";
            turn0 = false;
        } else {
            //playerx
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};
const showWinner = (winner) => {
    msg.innerText = `🎉 congratulations!, winner is ${winner}`;
    msgContainer.classList.remove("hide");
    updateScore(winner);
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                 highlightWinner(pattern);
            }
        }
    }
};

let xScore = 0;
let oScore = 0;

const updateScore = (winner) => {
    if (winner === "X") {
        xScore++;
        document.getElementById("x-score").innerText = xScore;
    } else if (winner === "0") { // ✅ zero check
        oScore++;
        document.getElementById("o-score").innerText = oScore;
    }
};

const highlightWinner = (pattern) => {
    pattern.forEach(index => {
        boxes[index].classList.add("win");
    });
};


document.getElementById("mode").addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

const computerMove = () => {
    let emptyBoxes = [...boxes].filter(box => box.innerText === "");
    let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    randomBox.click();
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

