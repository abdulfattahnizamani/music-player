let progress = document.getElementById('progress');
let song = document.getElementById('song');
let ctrlIcon = document.getElementById('ctrlIcon');


function playPause() {
    if (song.paused) {
        song.play();
        ctrlIcon.classList.remove('fa-play');
        ctrlIcon.classList.add('fa-pause');
    }
    else {
        song.pause();
        ctrlIcon.classList.remove('fa-pause');
        ctrlIcon.classList.add('fa-play');
    }
}

progress.oninput = () => {
    song.currentTime = progress.value;
};

song.addEventListener('timeupdate', () => {
  progress.value = song.currentTime;
}, 500);

song.addEventListener('loadedmetadata', () => {
    progress.max = song.duration;
});

progress.addEventListener('mousedown', () => {
    wasPlaying = !song.paused;
    song.pause();
});

progress.addEventListener('change', () => {
    song.currentTime = progress.value;
    if (wasPlaying) {
        song.play();
    }
});

song.addEventListener('ended', () => {
  ctrlIcon.classList.remove('fa-pause');
    ctrlIcon.classList.add('fa-play');
});