//  TODO
// 1 Gather the assets (music,thumbnails)
// 2 setting up the html css
// 3 dynamically get the song from js array
// 4 play & pause a song
// 5 progress bar is updating
// 6 switch song
// 7 shuffule option
// 8 repeat if u press the repeat btn

//  dynamically get the song from js array
const songs = [
  {
    title: "The Color Violet",
    artist: "Tory Lanez",
    url: "./songs/The Color Violet.mp3",
    thumbnail: "https://i1.sndcdn.com/artworks-XTdw6XGAR3WX-0-t500x500.jpg",
  },
  {
    title: "Moth To The Flame",
    artist: "The Weekend",
    url: "./songs/MothToAFlame.mp3",
    thumbnail:
      "https://production-digtracks-com.s3-ap-northeast-1.amazonaws.com/uploads/cover_art/file/82930/thumb_200_coverart.jpg",
  },
  {
    title: "Creepin",
    artist: "The Weeknd, 21 Savage",
    url: "./songs/creepin.mp3",
    thumbnail:
      "https://cdns-images.dzcdn.net/images/cover/862ab860ff69c30deeb5979db6e46b62/500x500.jpg",
  },
  {
    title: "My Love Mine All Mine",
    artist: "Mitski",
    url: "./songs/My Love Mine All Mine.mp3",
    thumbnail:
      "https://images.genius.com/15666d34474047d42a5023c3e74ee1f6.1000x1000x1.png",
  },
];

const title = document.querySelector("#title");
const artist = document.querySelector("#artist");
const thumbnail = document.querySelector("#thumbnail");
const progress = document.querySelector("#progress");
const currentTime = document.querySelector("#current-time");
const totalTime = document.querySelector("#total-time");
const repeatBtn = document.querySelector("#repeat-btn");
const prevBtn = document.querySelector("#prev-btn");
const toggleBtn = document.querySelector("#toggle-btn");
const nextBtn = document.querySelector("#next-btn");
const shuffleBtn = document.querySelector("#shuffle-btn");
const playlist = document.querySelector("#playlist");

const songsEls = [];
let activeSongIdx = undefined;

songs.forEach((song, index) => {
  const songBtn = document.createElement("button");
  const songEl = document.createElement("audio");

  songsEls.push(songEl);

  songBtn.className = "py-2 flex justify-between w-full hover:font-medium ";
  songEl.src = song.url;

  playlist.appendChild(songEl);

  songEl.addEventListener("loadedmetadata", () => {
    const { duration } = songEl;
    const time = getReadableTime(duration);

    song.time = time;

    songBtn.innerHTML = ` 
      ${song.title}
      <span>${time}</span>
      `;
    playlist.appendChild(songBtn);

    // for the first song
    if (index === 0) {
      activeSongIdx = index;
      //   currentTime.innerText = `0:00`;
      songBtn.classList.add("font-bold");
      setSongDetails(song);
    }
  });

  // to get the updated timeStamp
  songEl.addEventListener("timeupdate", () => {
    const currentElapsedTime = songEl.currentTime;
    currentTime.innerText = getReadableTime(currentElapsedTime);
    updateProgress(currentElapsedTime);
  });

  songBtn.addEventListener("click", () => {
    document
      .querySelector("#playlist button.font-bold ")
      .classList.remove("font-bold");
    //   making sure that the active song is paused

    songBtn.classList.add("font-bold");

    if (!songsEls[activeSongIdx].paused) {
      toggleBtn.classList.remove("play");
      songsEls[activeSongIdx].pause();
    }
    activeSongIdx = index;
    setSongDetails(song);
    songsEls[activeSongIdx].currentTime = 0;
  });
});

// Toggle Btn
toggleBtn.addEventListener("click", () => {
  if (songsEls[activeSongIdx].paused) {
    toggleBtn.classList.add("play");
    songsEls[activeSongIdx].play();
  } else {
    toggleBtn.classList.remove("play");
    songsEls[activeSongIdx].pause();
  }
});

// prevBtn

prevBtn.addEventListener("click", () => {
  if (!songsEls[activeSongIdx].paused) {
    toggleBtn.classList.remove("play");
    songsEls[activeSongIdx].pause();
  }

  activeSongIdx--;
  if (activeSongIdx < 0) {
    activeSongIdx = 0;
  }

  setSongDetails(songs[activeSongIdx]);
});

// nextBtn
nextBtn.addEventListener("click", () => {
  if (!songsEls[activeSongIdx].paused) {
    toggleBtn.classList.remove("play");
    songsEls[activeSongIdx].pause();
  }

  activeSongIdx++;
  if (activeSongIdx > songs.length - 1) {
    activeSongIdx = songs.length - 1;
  }

  setSongDetails(songs[activeSongIdx]);
});

// update the Progress Bar
function updateProgress(time) {
  progress.value = (time / songsEls[activeSongIdx].duration) * 100;
  //   console.log(time, activeSong.duration);
}

// songs details to htmk
function setSongDetails(song) {
  songsEls[activeSongIdx].currentTime = 0;
  currentTime.innerText = "0:00";
  totalTime.innerText = song.time;
  thumbnail.src = song.thumbnail;
  title.innerText = song.title;
  artist.innerText = song.artist;
}

// getting timestamp of the song
function getReadableTime(time) {
  return `${Math.floor(time / 60)}:${`${Math.floor(time % 60)}`.padStart(
    2,
    "0"
  )}`;
}
