const data = {
    song: [
        "Musics/2Pac, Big Syke – All Eyez On Me.mp3",
        "Musics/Eminem – Mockingbird.mp3",
        "Musics/Miyagi, Kadi – Radnaya Poy.mp3"
    ], 
    title: [
        "All Eyez On Me",
        "Mockingbird",
        "Родная пой"
    ],
    poster: [
        "images/alleyez.jpeg",
        "images/mockingbird.jpeg",
        "images/radnayapoy.jpg"
    ],
    artist: [
        "2Pac, Big Syke",
        "Eminem",
        "Miyagi, Kadi"
    ]
};

window.onload = function () {
    playSong();
}

let currentSong = 0;
let song = new Audio();
let likedSongs = [];

function playSong() {
    song.src = data.song[currentSong];
    document.querySelector(".songtitle").textContent = data.title[currentSong];
    document.querySelector(".artist").textContent = data.artist[currentSong];
    document.querySelector("#disk").src = data.poster[currentSong];
    document.querySelector(".main").style.backgroundImage = "url(" + data.poster[currentSong] + ")";
    song.play();
}

function playOrPauseSong() {
    let playButton = document.getElementById("play");
    if (song.paused) {
        song.play();
        playButton.src = "images/pause.png"; 
    } else {
        song.pause();
        playButton.src = "images/play-button-arrowhead.png"; 
    }
}

function nextSong() {
    currentSong = (currentSong + 1) % data.song.length;
    document.getElementById("play").src = "images/pause.png";
    playSong();
}

function previousSong() {
    currentSong = (currentSong - 1 + data.song.length) % data.song.length;
    document.getElementById("play").src = "images/pause.png";
    playSong();
}

function muteOrUnmute() {
    song.muted = !song.muted;
    document.getElementById("mute").src = song.muted ? "images/volume-mute.png" : "images/volume.png";
}

function increaseVolume() {
    if (song.volume < 1) song.volume += 0.1;
}

function decreaseVolume() {
    if (song.volume > 0) song.volume -= 0.1;
}

function toggleLike() {
    let likeButton = document.getElementById("like");
    let currentSongData = {
        song: data.song[currentSong],
        title: data.title[currentSong],
        artist: data.artist[currentSong],
        poster: data.poster[currentSong]
    };
    let songIndex = likedSongs.findIndex(song => song.song === currentSongData.song);

    if (songIndex === -1) {
        likedSongs.push(currentSongData);
        likeButton.src = "images/heart.png";
    } else {
        likedSongs.splice(songIndex, 1);
        likeButton.src = "images/heart1.png";
    }

    updateLikedList();
}

function updateLikedList() {
    let likedList = document.getElementById("liked-list");
    likedList.innerHTML = ""; 

    likedSongs.forEach(song => {
        let songElement = document.createElement("div");
        songElement.classList.add("liked-song");
        songElement.textContent = song.title + " - " + song.artist;
        songElement.addEventListener("click", function() {
            playLikedSong(song.song, song.title, song.artist, song.poster);
        });
        likedList.appendChild(songElement);
    });
}

function playLikedSong(song, title, artist, poster) {
    currentSong = data.song.indexOf(song);
    playSong();
}

updateLikedList();

song.addEventListener("timeupdate", function () {
    let fill = document.getElementById("fill");
    let position = song.currentTime / song.duration;
    fill.style.width = position * 100 + "%";
    convertTime(song.currentTime);
    if (song.ended) {
        nextSong();
    }
});

function convertTime(seconds) {
    let currentTime = document.getElementById("currentTime");
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    min = (min < 10) ? "0" + min : min;
    sec = (sec < 10) ? "0" + sec : sec;
    currentTime.textContent = min + ":" + sec;
    
    // Update remaining time
    let remainingTime = document.getElementById("remainingTime");
    let totalSeconds = Math.floor(song.duration);
    let remainingSeconds = totalSeconds - Math.floor(seconds);
    let remainingMin = Math.floor(remainingSeconds / 60);
    let remainingSec = remainingSeconds % 60;
    remainingMin = (remainingMin < 10) ? "0" + remainingMin : remainingMin;
    remainingSec = (remainingSec < 10) ? "0" + remainingSec : remainingSec;
    remainingTime.textContent = "-" + remainingMin + ":" + remainingSec;
    
    // Update interval time
    let intervalTime = document.getElementById("intervalTime");
    let intervalSeconds = Math.floor(seconds);
    let intervalMin = Math.floor(intervalSeconds / 60);
    let intervalSec = intervalSeconds % 60;
    intervalMin = (intervalMin < 10) ? "0" + intervalMin : intervalMin;
    intervalSec = (intervalSec < 10) ? "0" + intervalSec : intervalSec;
    intervalTime.textContent = intervalMin + ":" + intervalSec;
}

// Update time every second
setInterval(function() {
    convertTime(song.currentTime);
}, 1000);
