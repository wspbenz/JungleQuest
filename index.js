let gameData = JSON.parse(localStorage.getItem("gameData")) || {
  count: 0,
  level: 1,
  crate: "defaultcrate",
  background: "defaultbg",
  lvl100Unlocked: false,
  lvl200Unlocked: false,
};

// crate
const defaultcrate = document.getElementById("defaultcrate");
const lvl20crate = document.getElementById("lvl20crate");
const lvl50crate = document.getElementById("lvl50crate");
const lvl100crate = document.getElementById("lvl100crate");

const resetbtn = document.getElementById("resetbtn");
const levelupimg = document.getElementById("levelup");
const counter = document.getElementById("counter");
const levelText = document.getElementById("levels");
const resetalertbox = document.getElementById("reset");
const unlockalertbox = document.getElementById("unlock");
const unlocksamurai = document.getElementById("unlocksamurai");

const defaultbg = document.getElementById("defaultbg");
const mangrove = document.getElementById("mangrovebg");
const samuraibg = document.getElementById("samuraibg");

// sounds
const levelupsound = new Audio("assets/sounds/levelup.mp3");
const clicksound = new Audio("assets/sounds/click.mp3");

function updateUI() {
  counter.textContent = "x" + gameData.count;
  levelText.textContent = "Level " + gameData.level;
}

updateUI();

function showLevelUp() {
  levelupimg.classList.remove("fadeout");
  levelupimg.classList.remove("fadein");

  levelupimg.style.display = "block";

  // force reflow so animation restarts properly
  void levelupimg.offsetWidth;

  levelupimg.classList.add("fadein");

  levelupsound.currentTime = 0;
  levelupsound.play();

  setTimeout(() => {
    levelupimg.classList.remove("fadein");
    levelupimg.classList.add("fadeout");

    setTimeout(() => {
      levelupimg.style.display = "none";
    }, 300);
  }, 3000);
}

defaultcrate.onclick = function () {
  defaultcrate.classList.remove("popin");
  void defaultcrate.offsetWidth;
  defaultcrate.classList.add("popin");
  gameData.count++;

  counter.classList.remove("popin");
  void counter.offsetWidth;
  counter.classList.add("popin");

  clicksound.currentTime = 0;
  clicksound.play();

  if (gameData.count % 55 === 0) {
    gameData.level++;
    showLevelUp();
  }
  unlockcrate();
  updateUI();

  localStorage.setItem("gameData", JSON.stringify(gameData));
};

function unlockcrate() {
  if (gameData.level >= 200) {
    defaultcrate.src = "assets/lvl100crate.png";
    defaultbg.src = "assets/samurai.jpg";
    counter.style.color = "white";
    levels.style.color = "white";
  } else if (gameData.level >= 100) {
    defaultcrate.src = "assets/lvl100crate.png";
    defaultbg.src = "assets/mangrove.jpg";
    counter.style.color = "black";
    levels.style.color = "black";
  } else if (gameData.level >= 50) {
    defaultcrate.src = "assets/lvl50crate.png";
    defaultbg.src = "assets/village.jpg";
  } else if (gameData.level >= 20) {
    defaultcrate.src = "assets/lvl20crate.png";
    defaultbg.src = "assets/citybg.jpg";
  } else {
    defaultcrate.src = "assets/crate.png";
    defaultbg.src = "assets/bg.jpg";
    counter.style.color = "white";
    levels.style.color = "white";
  }
}
