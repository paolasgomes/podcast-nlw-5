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
                  <p id="posted-date">8 Jan 21 - <span>1:35:18</span></p>
        </div>
        <div class="play-button">
                  <button class="play" onclick="test()"><img src="assets/play.svg" /></button>
        </div>
        `;

      cardsContainer.append(div);

      data.map((episodes, index) => {
        getEpisodesAll(episodes, index);
      });
    });
  } catch (error) {}
};

const test = (episodes) => {
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
    <td>8 Jan 21</td>
    <td>${episodes.file.duration}</td>
    <td>
     <button><img src="assets/play.svg" alt="" /></button>
    </td>
    `;

  table.appendChild(rowTrack);
};

// latestEpisodes[index].innerText = item.title;
// membersPublish[index].innerText = item.members;

// const date = item.published_at;

// const convertedDate = new Date(date).toDateString("pt-br", {
//   year: "2-digit",
//   month: "short",
//   day: "numeric",
//   weekday: "",
// });

// publishDate[index].innerText = convertedDate;
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#weekday
