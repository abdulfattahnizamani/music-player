let progress = document.getElementById('progress');
let song = document.getElementById('song');
let ctrlIcon = document.getElementById('ctrlIcon');


function filterSongs(song) {
    return  {
        preview: song.preview,
        author: song.artist.name,
        title: song.album.title
    }
    
}

function getMusicData() {
    let baseUrl = `https://corsproxy.io/?https://api.deezer.com/search?q=eminem`;
    let response = null;
    fetch(baseUrl).then(res => res.json().then(data => {
        response = data;

        console.log(data.data)
        console.log(data.data.map(filterSongs))
    }))
    console.log(response);
    
}
getMusicData();

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