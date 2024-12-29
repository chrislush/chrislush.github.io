const doorCreak = new Audio("../music/door-creaking.mp3");

document.addEventListener('DOMContentLoaded', (e) => {
    document.querySelector('body').style.opacity = 1;
});

const pageTransitionFunc = (destination) => {
    document.querySelector("body").style.opacity = 0;
    doorCreak.addEventListener("ended", () => {
        setTimeout(() => {
            window.location.href = destination;
        }, 1000);
    });
    setTimeout(() => {
       doorCreak.play(); 
    }, 2000);
};