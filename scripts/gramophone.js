const gramophoneCanvas = document.getElementById("gramophone-canvas");
const gramophoneContext = gramophoneCanvas.getContext("2d");
const playBtn = document.getElementById("play-btn");
const pauseBtn = document.getElementById("pause-btn");
const records = document.querySelectorAll(".record");
let songPaused = true;

const allSongs = [
    {
        id: 0,
        title: "Sailing Away",
        artist: "HoliznaCC0",
        duration: "2:37",
        src: "../music/sailing-away.mp3"
    },
    {
        id: 1,
        title: "Barbara",
        artist: "U.S. Army Blues",
        duration: "8:41",
        src: "../music/barbara.mp3"
    },
    {
        id: 2,
        title: "Dance Of The Stargazer",
        artist: "U.S. Army Blues",
        duration: "11:42",
        src: "../music/dance-of-the-stargazer.mp3"
    },
    {
        id: 3,
        title: "Main Stem",
        artist: "U.S. Army Blues",
        duration: "2:50",
        src: "../music/main-stem.mp3"
    },
    {
        id: 4,
        title: "Not On The Bus",
        artist: "U.S. Army Blues",
        duration: "8:20",
        src: "../music/not-on-the-bus.mp3"
    }
];

const canvasWidth = gramophoneCanvas.width;
const canvasHeight = gramophoneCanvas.height;

const gramophoneImage = new Image();
gramophoneImage.src = "../images/gramophone-spritesheet.png";
const spriteWidth = 100;
const spriteHeight = 100;
let frameX = 0;
let gameFrame = 0;
const staggerFrames = 8;
let animationPaused = true;

gramophoneImage.onload = () => {
    gramophoneContext.drawImage(gramophoneImage, 0, spriteHeight, spriteWidth, spriteHeight, 0, 0, canvasWidth, canvasHeight);
}

const animate = () => {
    if (animationPaused) {
        gramophoneContext.clearRect(0, 0, canvasWidth, canvasHeight);
        gramophoneContext.drawImage(gramophoneImage, frameX * spriteWidth, spriteHeight, spriteWidth, spriteHeight, 0, 0, canvasWidth, canvasHeight);
        return;
    }

    gramophoneContext.clearRect(0, 0, canvasWidth, canvasHeight);
    gramophoneContext.drawImage(gramophoneImage, frameX * spriteWidth, 0, spriteWidth, spriteHeight, 0, 0, canvasWidth, canvasHeight);

    if (gameFrame % staggerFrames === 0) {
        if (frameX < 3) {
            frameX++;
        } else {
            frameX = 0;
        } 
    }
    
    gameFrame++;
    requestAnimationFrame(animate);
}

const audio = new Audio();

let userData = {
    currentSong: null,
    selectedSong: null,
    songCurrentTime: 0
};

const setPlayerDisplay = () => {
    const playingSong = document.getElementById("player-song-title");
    const songArtist = document.getElementById("player-song-artist");
    const currentTitle = userData?.selectedSong?.title;
    const currentArtist = userData?.selectedSong?.artist;
  
    playingSong.textContent = currentTitle ? currentTitle : "";
    songArtist.textContent = currentArtist ? currentArtist : "";
};

const highlightSelectedSong = () => {
    const songToHighlight = document.getElementById(`record${userData?.selectedSong?.id}`);

    records.forEach((record) => {
        record.classList.remove("highlighted");
    })

    if (songToHighlight) {
        songToHighlight.classList.add("highlighted");
    }
    setPlayerDisplay();
}

const deselectSong = (record) => {
    playBtn.classList.remove("activated");
    pauseBtn.classList.remove("activated");
    audio.pause();
    animationPaused = true;
    record.classList.remove("highlighted");
    userData.currentSong = null;
    userData.selectedSong = null;
    userData.songCurrentTime = 0;
    setPlayerDisplay();
}

const playSong = (song) => {
    audio.src = song.src;
    audio.title = song.title;

    if (!userData?.currentSong || userData?.currentSong.id !== song.id) {
        audio.currentTime = 0;
    } else {
        audio.currentTime = userData?.songCurrentTime;
    }

    userData.currentSong = song;

    pauseBtn.classList.remove("activated");
    playBtn.classList.add("activated");
    audio.play();
}

const pauseSong = () => {
    if (userData.selectedSong === null) {
        alert("A record should be playing ere you try to pause it!");
        return;
    }
    
    if (songPaused === true) {
        return;
    }

    songPaused = true;
    animationPaused = true;
    userData.songCurrentTime = audio.currentTime;
    playBtn.classList.remove("activated");
    pauseBtn.classList.add("activated");
    audio.pause();
}

const startPlayback = () => {
    if (userData.selectedSong === null) {
        alert("You need to select a record first!");
        return;
    }

    if (songPaused === false) {
        return;
    }

    songPaused = false;
    if (animationPaused = true) {
        animationPaused = false;
        animate();
    }
    playSong(userData.selectedSong);
}

for (let i = 0; i < 5; i++) {
    document.getElementById(`record${i}`).addEventListener("click", () => {
        if (userData?.selectedSong?.id === i) {
            deselectSong(document.getElementById(`record${i}`));
            return;
        }

        userData.selectedSong = allSongs.find((song) => song.id === i);
        highlightSelectedSong();

        if (userData.currentSong !== userData.selectedSong) {
            pauseSong();
            pauseBtn.classList.remove("activated");
        }
    });
}

playBtn.addEventListener("click", startPlayback);

pauseBtn.addEventListener("click", pauseSong);

audio.addEventListener("ended", () => {
    userData.songCurrentTime = 0;
    playSong(userData.selectedSong);
})