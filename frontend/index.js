const casinoButton = document.getElementById("casinos")
const bonusesButton = document.getElementById("bonuses")
const slotsButton = document.getElementById("slots")
const cards = document.getElementById("cards")

casinoButton.addEventListener("click", function() {
    this.classList.add("active");
    bonusesButton.classList.remove("active");
    slotsButton.classList.remove("active");
    cards.style.display = "inline";
})

bonusesButton.addEventListener("click", function() {
    this.classList.add("active");
    casinoButton.classList.remove("active");
    slotsButton.classList.remove("active");
    cards.style.display = "none";
})

slotsButton.addEventListener("click", function() {
    this.classList.add("active");
    casinoButton.classList.remove("active");
    bonusesButton.classList.remove("active");
    cards.style.display = "none";
})

const api_url = 'https://retoolapi.dev/RrRljN/casinos'
async function getCasinos() {
    const response = await fetch(api_url);
    const data = await response.json();
    data.forEach(function (casino) {
        document.getElementById("title").textContent = casino.title;
        document.getElementById("logo").innerHTML = `<img src="${casino.logo}"/>`;
        document.getElementById("rating").textContent = casino.rating;
        document.getElementById("url").innerHTML = `<a href="${casino.url}"/><button class="play-btn cursor-ponter">Play</button></>`;
        document.getElementById("background_color").style.backgroundColor = casino.background_color;
        const latestCasino = document.getElementById("casino-template").cloneNode(true);	
        document.getElementById("casino-container").appendChild(latestCasino);
    })
}

getCasinos();
