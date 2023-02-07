const selector = (element) => document.querySelector(element);

const latestEpisodes = selector("#track-name");
const membersPublish = selector("#track-members");
const publishDate = selector("#posted-date");
const playerBtn = selector(".play");
const cardsContainer = selector(".cards-releases");

const table = selector("table");

const url = "http://localhost:3000/episodes";

let data = [];

const getEpisodes = async () => {
  try {
    const response = await axios.get(url);
    data = response.data;
    console.log("data.lenght => ", data.lenght);

    const latestEpisodes = data.splice(-2);

    latestEpisodes.forEach((item) => {
      const div = document.createElement("div");
      div.classList.add("card-release");

      div.innerHTML = `
      <div class="track-image">
      <img src="assets/track-image.png" alt="track image" />
      </div>
      <div class="player-track">
      <div class="track-info">
      <h2 id="track-name">${item.title}</h2>
      <h3 id="track-members">${item.members}</h3>
      <p id="posted-date"> ${convertDate(item.published_at)} - <span>${convertSeconds(
        item.file.duration
      )}</span></p>
        </div>
        <div class="play-button">
        <button class="play"><img src="assets/play.svg" /></button>
        </div>
        `;

      cardsContainer.append(div);

      data.forEach((episodes, index) => {
        getEpisodesAll(episodes, index);
      });
    });
  } catch (error) {}
};

getEpisodes();

const getEpisodesAll = (episodes, index) => {
  const rowTrack = document.createElement("tr");
  rowTrack.innerHTML = `
    <td id="track-id">
    <img src="assets/track-image-table.png" alt="" />
    <span>${episodes.title}</span>
    </td>
     <td>${episodes.members}</td>
    <td>${convertDate(episodes.published_at)}</td>
    <td>${convertSeconds(episodes.file.duration)}</td>
    <td>
     <button><img src="assets/play.svg" alt="" /></button>
    </td>
    `;

  table.appendChild(rowTrack);
};

const convertDate = (dateEpisodes) => {
  const date = dateEpisodes;

  const convertedDate = new Date(date).toLocaleDateString("pt-br", {
    year: "2-digit",
    month: "2-digit",
    day: "numeric",
  });

  return convertedDate;
};

const convertSeconds = (secondsEpisodes) => {
  const seconds = secondsEpisodes;

  const convertedSeconds = new Date(seconds * 1000).toISOString().slice(11, 19);

  return convertedSeconds;
};
