//
const data = {
    song: [
        "Musics/2Pac, Big Syke – All Eyez On Me.mp3",
        "Musics/Eminem – Mockingbird.mp3",
        "Musics/Miyagi, Kadi – Radnaya Poy.mp3"], // replace with your audio file paths
    title: [
            "All Eyez On Me",
            "Mockingbird",
            "Родная пой"],
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
let song = new Audio()

function playSong() {
    song.src = data.song[currentSong];
    let songTitle = document.getElementsByClassName("songtitle");
    songTitle[0].textContent = data.title[currentSong];
    let artistName = document.getElementsByClassName("artist");
    artistName[0].textContent = data.artist[currentSong];
    let img = document.getElementsByClassName("row1");
    img[0].style.backgroundImage = "url(" + data.poster[currentSong] + ")";
    let main = document.getElementsByClassName("main");
    main[0].style.backgroundImage = "url(" + data.poster[currentSong] + ")";

    song.play();
}

function playOrPauseSong() {
    let playButton = document.getElementById("play");

    if (song.paused) {
        song.play();
        playButton.src = "images/pause.png"; // pause
    } else {
        song.pause();
        playButton.src = "images/play-button-arrowhead.png"; // play
    }
}

function nextSong() {
    currentSong = (currentSong + 1) % data.song.length;
    playSong();
}

function previousSong() {
    currentSong = (currentSong - 1 + data.song.length) % data.song.length;
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

song.addEventListener("timeupdate", function () {
    console.log(song.currentTime);
    console.log(song.duration);
    let fill = document.getElementById("fill")
    console.log(fill);
    let position = song.currentTime / song.duration;
    fill.style.width = position * 100 + "%";
    convertTime(song.currentTime) // cur. time
    if (song.ended) {
    next()
    }
    })
    function convertTime(seconds) {
        let currentTime = document.getElementById("currentTime")
        let min = Math.floor(seconds / 60)
        let sec = Math.floor(seconds % 60)
        min = (min < 10) ? "0" + min : min;
        sec = (sec < 10) ? "0" + sec : sec;
        console.log(currentTime);
        currentTime.textContent = min + ":" + sec

        totalTime(Math.round(song.duration))
        console.log(seconds);
        console.log(min);
        };





        function totalTime(seconds) {
            var min = Math.floor(seconds / 60)
            var sec = Math.floor(seconds % 60)
            min = (min < 10) ? "0" + min : min;
            sec = (sec < 10) ? "0" + sec : sec;
            currentTime.textContent += " / " + min + ":" + sec
            
            };