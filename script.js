const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("play-pause");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progressBar = document.getElementById("progress");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

const songs = [
  {
    title: "Song 1",
    artist: "Artist 1",
    src: "./songs/song1.mp3",
  },
  {
    title: "Song 2",
    artist: "Artist 2",
    src: "./songs/song2.mp3",
  },
  {
    title: "Song 3",
    artist: "Artist 3",
    src: "./songs/song3.mp3",
  },
];

let currentSongIndex = 0;
let isPlaying = false;

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
}

function playSong() {
  isPlaying = true;
  audio.play();
  playPauseBtn.textContent = "Pause";
}

function pauseSong() {
  isPlaying = false;
  audio.pause();
  playPauseBtn.textContent = "Play";
}

function playPause() {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(songs[currentSongIndex]);
  playSong();
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(songs[currentSongIndex]);
  playSong();
}

function updateProgress() {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progressBar.value = progressPercent;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

playPauseBtn.addEventListener("click", playPause);
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
audio.addEventListener("timeupdate", updateProgress);
progressBar.addEventListener("click", setProgress);

loadSong(songs[currentSongIndex]);
