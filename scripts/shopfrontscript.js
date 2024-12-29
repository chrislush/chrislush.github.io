const passwordContainer = document.querySelector(".password-container");
const doorArea = document.querySelector(".door");

const passwordPlease = () => {
    passwordContainer.classList.toggle("hidden");
    doorArea.classList.toggle("interactive");
};

const shopfrontImg = document.getElementById("shopfront");
const messageTag = document.getElementById("message");
const passwordInput = document.getElementById("password-input");
const inputBtn = document.getElementById("input-btn");

const checkPassword = input => {
    if (input === "") {
        alert("Please input something. You never know...");
        return;
    }

    const actualPassword = /^edam$/i;

    if (actualPassword.test(input)) {
        messageTag.innerHTML = "Roll up, roll up, step on inside!";
        messageTag.classList.add("correct");
        passwordInput.classList.toggle("hidden");
        inputBtn.classList.toggle("hidden");
        setTimeout(() => {
            pageTransitionFunc("../frontroom.html");
        }, 1000);
        
    } else {
        messageTag.innerHTML = "Not quite...";
        messageTag.classList.add("incorrect");
        passwordInput.classList.toggle("hidden");
        inputBtn.innerHTML = "TRY AGAIN";
        inputBtn.classList.add("incorrect");
        inputBtn.removeEventListener("click", check);
        inputBtn.addEventListener("click", reset);
    }
};

const check = () => {
    checkPassword(passwordInput.value);
    passwordInput.value = "";
};

const reset = () => {
    messageTag.classList.remove("incorrect");
    messageTag.innerHTML = "What cheese is made backwards?";
    passwordInput.classList.toggle("hidden");
    inputBtn.innerHTML = "SUBMIT";
    inputBtn.classList.remove("incorrect");
    inputBtn.removeEventListener("click", reset);
    inputBtn.addEventListener("click", check);
};

inputBtn.addEventListener("click", check);

shopfrontImg.addEventListener("click", () => {
    if (!passwordContainer.classList.contains("hidden")) {
        passwordContainer.classList.toggle("hidden");
        doorArea.classList.toggle("interactive");
    } else {
        return;
    }
})