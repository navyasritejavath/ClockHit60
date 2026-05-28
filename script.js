// state
let stopwatchLoopId = null;
let countingTicks = 0;

// elements
const clockLabel = document.getElementById('clock-label');
const dateLabel = document.getElementById('date-label');
const watchLabel = document.getElementById('watch-label');

const startButton = document.getElementById('btn-start');
const stopButton = document.getElementById('btn-stop');
const resetButton = document.getElementById('btn-reset');

const clockTabBtn = document.getElementById('clock-tab-btn');
const watchTabBtn = document.getElementById('watch-tab-btn');
const clockPanel = document.getElementById('clock-panel');
const watchPanel = document.getElementById('watch-panel');

// switch tabs
clockTabBtn.addEventListener('click', () => switchAppView(true));
watchTabBtn.addEventListener('click', () => switchAppView(false));

function switchAppView(showClock) {
  if (showClock) {
    clockTabBtn.classList.add('active');
    watchTabBtn.classList.remove('active');
    clockPanel.classList.remove('hidden');
    watchPanel.classList.add('hidden');
  } else {
    watchTabBtn.classList.add('active');
    clockTabBtn.classList.remove('active');
    watchPanel.classList.remove('hidden');
    clockPanel.classList.add('hidden');
  }
}

// clock
function runLiveClock() {
  const now = new Date();

  let hour = now.getHours();
  const min = String(now.getMinutes()).padStart(2, '0');
  const sec = String(now.getSeconds()).padStart(2, '0');
  const ampm = hour >= 12 ? 'PM' : 'AM';

  hour = hour % 12 || 12;

  clockLabel.innerText = `${String(hour).padStart(2, '0')}:${min}:${sec}`;

  const day = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  dateLabel.innerText = `${ampm} - ${day}`;
}

setInterval(runLiveClock, 1000);
runLiveClock();

// stopwatch
startButton.addEventListener('click', startStopwatch);
stopButton.addEventListener('click', pauseStopwatch);
resetButton.addEventListener('click', resetStopwatch);

function startStopwatch() {
  startButton.classList.add('hidden');
  stopButton.classList.remove('hidden');
  resetButton.disabled = true;

  stopwatchLoopId = setInterval(() => {
    countingTicks++;
    updateStopwatchText();
  }, 10);
}

function pauseStopwatch() {
  clearInterval(stopwatchLoopId);

  stopButton.classList.add('hidden');
  startButton.classList.remove('hidden');
  resetButton.disabled = false;
}

function resetStopwatch() {
  clearInterval(stopwatchLoopId);
  countingTicks = 0;

  watchLabel.innerText = "00:00:00";
  resetButton.disabled = true;
}

function updateStopwatchText() {
  const mins = Math.floor(countingTicks / 6000);
  const secs = Math.floor((countingTicks % 6000) / 100);
  const ms = countingTicks % 100;

  watchLabel.innerText =
    `${String(mins).padStart(2, '0')}:` +
    `${String(secs).padStart(2, '0')}:` +
    `${String(ms).padStart(2, '0')}`;
}
