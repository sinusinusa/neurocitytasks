const videoPlayer = document.getElementById('videoPlayer');
const playPauseOverlay = document.getElementById('playPauseOverlay');
const timeDisplay = document.getElementById('timeDisplay');

videoPlayer.addEventListener('loadedmetadata', () => {
    updateTimeDisplay(0);
});

videoPlayer.addEventListener('timeupdate', () => {
    updateTimeDisplay(videoPlayer.currentTime);
});

playPauseOverlay.addEventListener('click', () => {
    if (videoPlayer.paused) {
        videoPlayer.play();
    } else {
        videoPlayer.pause();
    }
});

videoPlayer.addEventListener('ended', () => {
    videoPlayer.currentTime = 0;
    updateTimeDisplay(0);
    videoPlayer.pause();
});

function updateTimeDisplay(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const milliseconds = Math.floor((time - Math.floor(time)) * 1000);

    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(3, '0')}`;

    timeDisplay.textContent = formattedTime;
}