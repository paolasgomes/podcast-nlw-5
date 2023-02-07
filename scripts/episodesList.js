const latestEpisodes = document.querySelectorAll("#track-name");
const membersPublish = document.querySelectorAll("#track-members");
const publishDate = document.querySelectorAll("#posted-date");
const playerBtn = document.querySelectorAll(".play");
const cardsContainer = document.querySelector(".cards-releases");

const table = document.querySelector("table");

const url = "http://localhost:3000/episodes";

const getEpisodes = async () => {
  console.log("qwee");

  try {
    const response = await axios.get(url);
    const data = response.data;

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
                  <p id="posted-date"> ${convertDate(
                    item.published_at
                  )} - <span>${convertSeconds(item.file.duration)}</span></p>
        </div>
        <div class="play-button">
                  <button class="play" onclick="test()"><img src="assets/play.svg" /></button>
        </div>
        `;

      cardsContainer.append(div);

      data.forEach((episodes, index) => {
        getEpisodesAll(episodes, index);
      });
    });
  } catch (error) {}
};

const test = () => {
  let oi = 0;
  console.log("oi => ", oi);
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
