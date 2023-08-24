let songIndex = 0;
let audioElement = new Audio("songs/Believer.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songList = document.getElementById("songList");
let songIndicatorName = document.getElementById("songIndicatorName");

let abhaySong = [
  {
    songName: "Bekhayali",
    filePath: "songs/Bekhayali.mp3",
    coverPath: "cover/Bekhayali.jpg",
  },
  {
    songName: "Believer",
    filePath: "songs/Believer.mp3",
    coverPath: "cover/beliver.jpg",
  },
  {
    songName: "Coca_cola",
    filePath: "songs/Coca cola.mp3",
    coverPath: "cover/coca cola.jpg",
  },
  {
    songName: "Duniya",
    filePath: "songs/Duniya.mp3",
    coverPath: "cover/duniya.jpg",
  },
  {
    songName: "Guru_randhava",
    filePath: "songs/Guru randhava.mp3",
    coverPath: "cover/guru randhava.jpg",
  },
  {
    songName: "Himesh",
    filePath: "songs/Himesh.mp3",
    coverPath: "cover/himesh.jpg",
  },
  {
    songName: "Kaise_hua",
    filePath: "songs/Kaise hua.mp3",
    coverPath: "cover/kaise hua.jpg",
  },
  {
    songName: "Mere_sonea",
    filePath: "songs/Mere sonea.mp3",
    coverPath: "cover/mere sonea.jpg",
  },
  {
    songName: "Mirchi",
    filePath: "songs/Mirchi.mp3",
    coverPath: "cover/mirchi.jpg",
  },
  {
    songName: "On_my_way",
    filePath: "songs/On my way.mp3",
    coverPath: "cover/on my way.jpg",
  },
];
let index = 0;
abhaySong.forEach((element, i) => {
  // console.log(element, i);
  songList.innerHTML += `<div class="songItem" id="item${index++}">
  <img src="${element.coverPath}" alt="song pic" />
  <span class="songName">${element.songName}</span>
  <span class="songlistplay"><span class="timeStemp">05.35</span><i class="songItemPlay fa-regular fa-2x fa-circle-play" id="${
    element.filePath
  }"></i></span>
</div>`;
});

let songItemPlay = document.getElementsByClassName("songItemPlay"); //badha song na icon ne use kare 6
const makeAllPlay = () => {
  Array.from(songItemPlay).forEach((elem) => {
    // console.log(elem)
    elem.classList.remove("fa-circle-pause");
    elem.classList.add("fa-circle-play");
  });
};
Array.from(songItemPlay).forEach((elem) => {
  elem.addEventListener("click", (e) => {
    console.log(e.target); // when you click this is work
    makeAllPlay();
    e.target.classList.remove("fa-circle-play");
    e.target.classList.add("fa-circle-pause");
    songIndicatorName.innerText = `${e.target.id}`;
    audioElement.currentTime = 0;
    audioElement.src = `${e.target.id}`;
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
    let iconElem = e.target;
    window.parElem = iconElem.parentNode.parentNode;
    // console.log(parElem);
  });
});

//handle play/pause
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    makeAllPlay();
    gif.style.opacity = 0;
  }
});

// set the privious button
document.getElementById("previous").addEventListener("click", () => {
  preSong = window.parElem.previousElementSibling;
  let previousSong = preSong.querySelector("i");
  audioElement.src = `${previousSong.id}`;
  audioElement.play();
  songIndicatorName.innerText = `${previousSong.id}`;
  makeAllPlay();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
  previousSong.classList.remove("fa-circle-play");
  previousSong.classList.add("fa-circle-pause");
  window.parElem = previousSong.parentNode.parentNode;
});

// set the next button
document.getElementById("next").addEventListener("click", () => {
  nextSong = window.parElem.nextElementSibling;
  let nextSongIcon = nextSong.querySelector("i");
  audioElement.src = `${nextSongIcon.id}`;
  audioElement.play();
  songIndicatorName.innerText = `${nextSongIcon.id}`;
  makeAllPlay();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
  nextSongIcon.classList.remove("fa-circle-play");
  nextSongIcon.classList.add("fa-circle-pause");
  window.parElem = nextSongIcon.parentNode.parentNode;
});

//litsen to the event
audioElement.addEventListener("timeupdate", () => {
  // console.log("timeupdate");
  //update seek bar //taka ma convert karyu 6
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

//update as seekbar
myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});
