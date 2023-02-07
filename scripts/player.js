let episodeIndex = 0;
let isPlaying = false;

const audioElement = selector("audio");
const currentEpisodeTitle = selector(".player-info h2");

const playButton = selector(".play");
const prevButton = selector(".prev");
const nextButton = selector(".next");

const currentTimeElement = selector(".current-time");
const totalTimeElement = selector(".total-time");

const inputRange = selector("input[type=range]");

const toggleEpisodes = (event, index = episodeIndex) => {
  currentEpisodeTitle.innerText = data[index].title;
  audioElement.src = data[index].file.url;

  if (isPlaying) {
    isPlaying = false;

    playButton.innerHTML = `<i class="ph-play"></i>`;

    audioElement.pause();
  } else {
    isPlaying = true;

    playButton.innerHTML = `<i class="ph-stop"></i>`;

    audioElement.play();
  }
};
const nextEpisode = () => {
  isPlaying = false;

  if (episodeIndex < data.length - 1) {
    episodeIndex++;

    toggleEpisodes();
  }
};

const prevEpisode = () => {
  isPlaying = false;

  if (episodeIndex > 0) {
    episodeIndex--;

    toggleEpisodes();
  }
};

const updateEpisodeTimes = (event) => {
  const { currentTime } = event.srcElement;

  currentTimeElement.innerHTML = convertTime(currentTime || 0);
  totalTimeElement.innerHTML = convertTime(data[episodeIndex].file.duration);

  inputRange.value = currentTime;
};

const handleInputRangeValue = (event) => {
  const value = event.target.value;

  audioElement.currentTime = value;
};

const handleInputRangeMaxValue = (event) => {
  const { duration } = event.srcElement;

  inputRange.max = duration;
};

const convertTime = (inputSeconds) => {
  const seconds = String(Math.floor(inputSeconds % 60)).padStart(2, 0);
  const minutes = String(Math.floor(inputSeconds / 60)).padStart(2, 0);

  return minutes + ":" + seconds;
};

playButton.addEventListener("click", toggleEpisodes);
prevButton.addEventListener("click", prevEpisode);
nextButton.addEventListener("click", nextEpisode);

audioElement.addEventListener("timeupdate", updateEpisodeTimes);
audioElement.addEventListener("loadedmetadata", handleInputRangeMaxValue);

inputRange.addEventListener("change", handleInputRangeValue);
