const keys = document.querySelectorAll(".key");

// Map keyboard keys to piano notes
const keyMap = {
    "a": "C",
    "w": "Db",
    "s": "D",
    "e": "Eb",
    "d": "E",
    "f": "F",
    "t": "Gb",
    "g": "G",
    "y": "Ab",
    "h": "A",
    "u": "Bb",
    "j": "B",
    "k": "C", // Next octave (if available)
};

// Add event listeners for mouse clicks
keys.forEach(key => key.addEventListener("click", handleKeyClick));

// Add event listeners for keyboard input
document.addEventListener("keydown", handleKeyPress);
document.addEventListener("keyup", handleKeyRelease);

function handleKeyClick() {
    playKey(this);
}

function handleKeyPress(event) {
    const note = keyMap[event.key];
    if (note) {
        const keyElement = document.querySelector(`.key[data-note="${note}"]`);
        if (keyElement && !keyElement.classList.contains("active")) {
            playKey(keyElement);
        }
    }
}

function handleKeyRelease(event) {
    const note = keyMap[event.key];
    if (note) {
        const keyElement = document.querySelector(`.key[data-note="${note}"]`);
        if (keyElement) {
            keyElement.classList.remove("active");
        }
    }
}

function playKey(key) {
    const keyAudio = document.getElementById(key.dataset.note);
    if (!keyAudio) return;

    keyAudio.currentTime = 0;
    keyAudio.play();

    key.classList.add("active");

    keyAudio.addEventListener("ended", () => {
        key.classList.remove("active");
    });
}
