const currentDate = document.querySelector("#current-date");

const showDate = () => {
  const date = new Date();
  const today = date.getUTCDate();
  let week = date.getUTCDay();
  let month = date.getUTCMonth() + 1;

  switch (week) {
    case 1:
      week = "Seg";
      break;
    case 2:
      week = "Ter";
      break;
    case 3:
      week = "Quar";
      break;
    case 4:
      week = "Qui";
      break;
    case 5:
      week = "Sex";
      break;
    case 6:
      week = "Sáb";
      break;
    case 7:
      week = "Dom";
      break;
  }

  switch (month) {
    case 1:
      month = "Janeiro";
      break;
    case 2:
      month = "Fevereiro";
      break;
    case 3:
      month = "Março";
      break;
    case 4:
      month = "Abril";
      break;
    case 5:
      month = "Maio";
      break;
    case 6:
      month = "Junho";
      break;
    case 7:
      month = "Julho";
      break;
    case 8:
      month = "Agosto";
      break;
    case 9:
      month = "Setembro";
      break;
    case 10:
      month = "Outubro";
      break;
    case 11:
      month = "Novembro";
      break;
    case 12:
      month = "Dezembro";
      break;
  }

  currentDate.innerText = `${week}, ${today} de ${month}`;
};

showDate();
