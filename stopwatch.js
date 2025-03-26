document.addEventListener('DOMContentLoaded', () => {
    const startStopBtn = document.getElementById('startStopBtn');
    const resetBtn = document.getElementById('resetBtn');
    const hoursDisplay = document.getElementById('hours');
    const minutesDisplay = document.getElementById('minutes');
    const secondsDisplay = document.getElementById('seconds');
    const millisecondsDisplay = document.getElementById('milliseconds');

    let time = 0;
    let isRunning = false;
    let intervalId = null;

    function formatNumber(number, digits) {
        return number.toString().padStart(digits, '0');
    }

    function updateDisplay() {
        const hours = Math.floor(time / 3600000);
        const minutes = Math.floor((time % 3600000) / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        const milliseconds = Math.floor((time % 1000) / 10);

        hoursDisplay.textContent = formatNumber(hours, 2);
        minutesDisplay.textContent = formatNumber(minutes, 2);
        secondsDisplay.textContent = formatNumber(seconds, 2);
        millisecondsDisplay.textContent = formatNumber(milliseconds, 2);
    }

    function toggleStartStop() {
        isRunning = !isRunning;
        if (isRunning) {
            startStopBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>';
            startStopBtn.classList.remove('start');
            startStopBtn.classList.add('pause');
            intervalId = setInterval(() => {
                time += 10;
                updateDisplay();
            }, 10);
        } else {
            startStopBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>';
            startStopBtn.classList.remove('pause');
            startStopBtn.classList.add('start');
            clearInterval(intervalId);
        }
    }

    function reset() {
        isRunning = false;
        clearInterval(intervalId);
        time = 0;
        updateDisplay();
        startStopBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>';
        startStopBtn.classList.remove('pause');
        startStopBtn.classList.add('start');
    }

    startStopBtn.addEventListener('click', toggleStartStop);
    resetBtn.addEventListener('click', reset);
});