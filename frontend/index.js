const casinoButton = document.getElementById("casinos");
const bonusesButton = document.getElementById("bonuses");
const slotsButton = document.getElementById("slots");
const casinoContainer = document.getElementById("casino-container");
const cards = document.getElementById("cards");
const arrowRight = document.getElementById("arrowRight");
const arrowLeft = document.getElementById("arrowLeft");

casinoButton.addEventListener("click", function () {
  this.classList.add("active");
  bonusesButton.classList.remove("active");
  slotsButton.classList.remove("active");
  cards.style.display = "inline";
});

bonusesButton.addEventListener("click", function () {
  this.classList.add("active");
  casinoButton.classList.remove("active");
  slotsButton.classList.remove("active");
  cards.style.display = "none";
});

slotsButton.addEventListener("click", function () {
  this.classList.add("active");
  casinoButton.classList.remove("active");
  bonusesButton.classList.remove("active");
  cards.style.display = "none";
});

const scrolling = () => {
  casinoContainer.scrollTo(
    scrollsRightCount * 1000 - scrollsLeftCount * 1000,
    0
  );
};

let scrollsRightCount = 0;
let scrollsLeftCount = 0;

arrowRight.addEventListener("click", function () {
  scrollsRightCount++;
  let scrolls = scrollsRightCount - scrollsLeftCount;
  scrolls > 0 ? (arrowLeft.style.display = "inline") : "";
  scrolling();
});

arrowLeft.addEventListener("click", function () {
  scrollsLeftCount++;
  let scrolls = scrollsRightCount - scrollsLeftCount;
  scrolls === 0 ? (arrowLeft.style.display = "none") : "";
  scrolling();
});

const api_url = "https://retoolapi.dev/RrRljN/casinos";
async function getCasinos() {
  const response = await fetch(api_url);
  const data = await response.json();
  localStorage.setItem("casinoSites", JSON.stringify(data));
}

const displayCasinos = () => {
  const casinos = JSON.parse(localStorage.getItem("casinoSites"));
  casinos.forEach(function (casino) {
    document.getElementById("title").textContent = casino.title;
    document.getElementById("logo").innerHTML = `<img src="${casino.logo}"/>`;
    document.getElementById("rating").textContent = casino.rating;
    document.getElementById(
      "url"
    ).innerHTML = `<a href="${casino.url}"/><button class="play-btn cursor-ponter">Play</button></>`;
    document.getElementById("background_color").style.backgroundColor =
      casino.background_color;
    const latestCasino = document
      .getElementById("casino-template")
      .cloneNode(true);
    document.getElementById("casino-container").appendChild(latestCasino);
  });
};

if (localStorage.getItem("casinosSites") === null) {
  getCasinos();
  displayCasinos();
} else {
  displayCasinos();
}
