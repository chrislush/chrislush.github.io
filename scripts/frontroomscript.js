const darkness = document.getElementById("darkness");

const clockFrame = document.getElementById("clock-frame");
const clockCloseBtn = document.querySelector(".clock-close-btn");

const newspaperArea = document.querySelector(".newspaper");
const sudokuContainer = document.querySelector(".sudoku-container");

const bookArea = document.querySelector(".book");
const autobiography = document.querySelector(".autobiography");

const gramophoneArea = document.querySelector(".gramophone");
const musicPlayer = document.querySelector(".music-player");

const cheeseArea = document.getElementById("mousetrap-link");

setTimeout(() => {
    document.getElementById("instructions").style.opacity = 1;
}, 3000)

const silence = () => {
    clockFrame.classList.remove("interactive");
    newspaperArea.classList.remove("interactive");
    bookArea.classList.remove("interactive");
    gramophoneArea.classList.remove("interactive");
    clockCanvas.onclick = null;
    newspaperArea.onclick = null;
    bookArea.onclick = null;
    gramophoneArea.onclick = null;
    cheeseArea.classList.add("hidden");
}

const restoreInteractiveness = () => {
    clockFrame.classList.add("interactive");
    newspaperArea.classList.add("interactive");
    bookArea.classList.add("interactive");
    gramophoneArea.classList.add("interactive");
    clockCanvas.onclick = magnifyClock;
    newspaperArea.onclick = sudokuPuzzle;
    bookArea.onclick = pickUpBook;
    gramophoneArea.onclick = openMusicPlayer;
    cheeseArea.classList.remove("hidden");
}

const tomTalk = document.getElementById("tom-talk");
const textDiv = document.getElementById("text-div");
const talkNextBtn = document.querySelector(".talk-next-btn");
const talkCloseBtn = document.querySelector(".talk-close-btn");

const tomCanvas = document.getElementById("tom-canvas");
const tomContext = tomCanvas.getContext("2d");
const tomCanvasWidth = tomCanvas.width;
const tomCanvasHeight = tomCanvas.height;

const tomImage = new Image();
tomImage.src = "../images/tom-spritesheet.png";
let tomFrameX = 0;
let tomFrameY = 0;
let tomGameFrame = 0;
let tomStaggerFrames = 20;
let progress = -128;

let walkRightEnded = false;
let talkEnded = false;
let walkLeftEnded = false;

const messages = [
    "<p>The name's Tom D'Auvergne, private investigator, and it's my distinct pleasure to welcome you to The Puzzle Parlour, London's premier hideaway for brainteaser buffs, enigma enthusiasts and all those who enjoy sharing in a good conundrum.</p>",
    "<p>I'm afraid the owner has been called away on urgent business, but as a regular here, I'm confident I can give you the lowdown on this place.</p>",
    "<p>Although, given the nature of this establishment, perhaps it would be more appropriate if I were to simply leave you to it?</p>",
    "<p>Yes, I think that's how we'll do it! Don't be shy now, puzzle fiend, take a good look around! Here, borrow my magnifying glass. It's seen me through some trying cases, and I've no doubt it will serve you well too.</p>"
];
let messageCount = 0;

const nextMessage = () => {
    textDiv.innerHTML = messages[messageCount];
    messageCount++;

    if (messageCount == 4) {
        talkNextBtn.remove();
        talkCloseBtn.classList.remove("hidden");
        document.body.style.cursor = "url(../images/investigativecursor.png) 11 11, pointer";
    }
}

const endTalk = () => {
    tomTalk.classList.add("hidden");
    talkEnded = true;
}

const tomWalkRight = () => {
    if (walkRightEnded) {
        tomFrameX = 0;
        tomFrameY = 2;
        tomGameFrame = 0;
        tomTalk.classList.remove("hidden");
        tomIdle();
        return;
    }

    tomContext.clearRect(0, 0, tomCanvasWidth, tomCanvasHeight);
    tomContext.drawImage(tomImage, 128 * tomFrameX, 128 * tomFrameY, 128, 128, progress, 0, 128, 128);

    if (tomGameFrame % tomStaggerFrames === 0) {
        if (tomFrameX < 3) {
            tomFrameX++;
        } else {
            tomFrameX = 0;
        } 
    }
    
    tomGameFrame++;

    if (progress < tomCanvasWidth - 128) {
        progress++;
    } else {
        walkRightEnded = true;
    }
    
    requestAnimationFrame(tomWalkRight);
}

const tomIdle = () => {
    if (talkEnded) {
        tomFrameX = 0;
        tomFrameY = 1;
        tomGameFrame = 0;
        tomWalkLeft();
        return;
    }

    tomContext.clearRect(0, 0, tomCanvasWidth, tomCanvasHeight);
    tomContext.drawImage(tomImage, 128 * tomFrameX, 128 * tomFrameY, 128, 128, progress, 0, 128, 128);

    if (tomGameFrame % tomStaggerFrames === 0) {
        if (tomFrameX < 1) {
            tomFrameX++;
        } else {
            tomFrameX = 0;
        } 
    }
    
    tomGameFrame++;
    
    requestAnimationFrame(tomIdle);
}

const tomWalkLeft = () => {
    if (walkLeftEnded) {
        tomCanvas.remove();
        restoreInteractiveness();
        return;
    }

    tomContext.clearRect(0, 0, tomCanvasWidth, tomCanvasHeight);
    tomContext.drawImage(tomImage, 128 * tomFrameX, 128 * tomFrameY, 128, 128, progress, 0, 128, 128);

    if (tomGameFrame % tomStaggerFrames === 0) {
        if (tomFrameX < 3) {
            tomFrameX++;
        } else {
            tomFrameX = 0;
        } 
    }
    
    tomGameFrame++;

    if (progress > -128) {
        progress--;
    } else {
        walkLeftEnded = true;
    }
    
    requestAnimationFrame(tomWalkLeft);
}

const lightOn = () => {
    document.getElementById("panel").display = "none";
    document.getElementById("instructions").display = "none";
    darkness.classList.add("fade");
    darkness.addEventListener("animationend", () => {
        darkness.remove();
        silence();
        tomWalkRight();
    });
}

const magnifyClock = () => {
    clockFrame.classList.add("enlarged");
    clockCloseBtn.classList.add("enlarged");
    clockCloseBtn.onclick = closeClock;
    clockCanvas.onclick = null;
    silence();
}

const closeClock = () => {
    clockFrame.classList.remove("enlarged");
    clockCloseBtn.onclick = null;
    clockCanvas.onclick = magnifyClock;
    restoreInteractiveness();
}

const pickUpBook = () => {
    autobiography.classList.remove("hidden");
    silence();
}

const closeBook = () => {
    autobiography.classList.add("hidden");
    const checkboxes = document.querySelectorAll("input[type=checkbox]");
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
    }
    restoreInteractiveness();
}

const openMusicPlayer = () => {
    musicPlayer.style.height = "100%";
    musicPlayer.style.border = "3px solid var(--blue)"
}

const closeMusicPlayer = () => {
    musicPlayer.style.height = "0%";
    musicPlayer.style.border = "none";
}

const sudokuPuzzle = () => {
    sudokuContainer.classList.remove("hidden");
    silence();
}

const closeSudoku = () => {
    sudokuContainer.classList.add("hidden");
    restoreInteractiveness();
}
