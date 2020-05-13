let timeInterval;

let timesStopped = 0;
let timerRunning = false;

let initialTime;
let stoppedTime;
let firstAfterStop = false;
let stoppedFor = 0;

$("#go").click(function (e) {
    if (timerRunning) {
        $(this).text("GO");
        clearInterval(timeInterval);

        timerRunning = false;
        stoppedTime = new Date();
        timesStopped++;
    }
    else {
        $(this).text("STOP");
        timeInterval = setInterval(setTimer, 10);

        firstAfterStop = true;
        if (timesStopped === 0) {
            initialTime = new Date();
            firstAfterStop = false;
        }
        timerRunning = true;
    }
});

$("#reset").click(function (ev) {
    clearInterval(timeInterval);
    $("#go").text("GO");
    setTimerHtml(0, 0, 0);

    firstAfterStop = false;
    stoppedFor = 0;
    timesStopped = 0;
    timerRunning = false;
});

function setTimer() {
    const currentTime = new Date();
    if (firstAfterStop) {
        stoppedFor += currentTime - stoppedTime;
        firstAfterStop = false;
    }
    const timer = new Date (currentTime - initialTime - stoppedFor);

    let milliseconds = timer.getMilliseconds().toString().slice(0, 2);
    let seconds = timer.getSeconds();
    let minutes = timer.getMinutes();
    
    setTimerHtml(minutes, seconds, milliseconds)
}

function setTimerHtml(minutes, seconds, milliseconds)
{
    milliseconds = milliseconds < 10 ? "0" + milliseconds : milliseconds;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    $(".milliseconds").text(milliseconds);
    $(".seconds").text(seconds);
    $(".minutes").text(minutes);
}
