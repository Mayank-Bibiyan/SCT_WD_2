const display = document.getElementById("display");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const laps = document.getElementById("laps");

let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;
let lapCount = 1;

function updateTime() {

    const currentTime = Date.now() - startTime + elapsedTime;

    const hours = Math.floor(currentTime / 3600000);
    const minutes = Math.floor((currentTime % 3600000) / 60000);
    const seconds = Math.floor((currentTime % 60000) / 1000);
    const milliseconds = currentTime % 1000;

    display.textContent =
        `${String(hours).padStart(2, '0')}:` +
        `${String(minutes).padStart(2, '0')}:` +
        `${String(seconds).padStart(2, '0')}.` +
        `${String(milliseconds).padStart(3, '0')}`;
}

startBtn.addEventListener("click", () => {

    if (!running) {

        startTime = Date.now();

        timerInterval = setInterval(updateTime, 10);

        running = true;
    }
});

pauseBtn.addEventListener("click", () => {

    if (running) {

        clearInterval(timerInterval);

        elapsedTime += Date.now() - startTime;

        running = false;
    }
});

resetBtn.addEventListener("click", () => {

    clearInterval(timerInterval);

    startTime = 0;
    elapsedTime = 0;
    running = false;
    lapCount = 1;

    display.textContent = "00:00:00.000";

    laps.innerHTML = "";
});

lapBtn.addEventListener("click", () => {

    if (!running) return;

    const lap = document.createElement("li");

    lap.innerHTML = `
        <span>Lap ${lapCount}</span>
        <span>${display.textContent}</span>
    `;

    laps.prepend(lap);

    lapCount++;
});