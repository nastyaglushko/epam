const bottleGame = {
  bottlesItem: document.getElementById("bottles"),
  bottlesCountItem: document.getElementById("count"),
  playButton: document.getElementById("start"),

  startGame: function() {
    const bottles = this.bottlesCountItem.value;
    if (bottles < 0) alert("Number must be more than 0!");
    else {
      this.bottlesItem.innerHTML = "";
      getBottlePyramid(bottles);
    }
  }
};

function getBottlePyramid(count) {
  const line = document.createElement("div");
  line.className = "itemLine";
  const info = document.createElement("div");
  info.className = "bottleInfo";
  if (count == 0) {
    info.innerHTML = "No bottles left";
    bottleGame.bottlesItem.appendChild(info);
  } else {
    info.innerHTML = `${count} bottles are left, one is falling. `;
    bottleGame.bottlesItem.appendChild(info);
    for (let i = 0; i < count; i++) {
      const b = document.createElement("img");
      b.src = "../images/bottle.png";
      b.className = "bottleItem";
      line.appendChild(b);
    }
    bottleGame.bottlesItem.appendChild(line);
    getBottlePyramid(count - 1);
  }
}

bottleGame.playButton.onclick = function() {
  bottleGame.startGame();
};
