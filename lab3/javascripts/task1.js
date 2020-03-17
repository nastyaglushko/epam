const playButton = document.getElementById("start");

const womenNames = ["Jane", "Hazel", "Yen", "Triss"];
const menNames = ["Sheldon", "Jake", "James", "Tony"];
const cities = ["Lviv", "London", "Amsterdam", "New York"];
const jobs = ["Dancer", "Developer", "Engineer", "Manager"];

var userName = "Username";

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getMarried(sex) {
  let name;
  if (sex === "w") name = womenNames[getRandomInt(womenNames.length)];
  else name = menNames[getRandomInt(menNames.length)];
  return `${userName}, you'll get married with ${name} and you'll have ${getRandomInt(
    10
  )} children`;
}

function getWork() {
  return `${userName}, you'll move to ${
    cities[getRandomInt(cities.length)]
  } to work as ${jobs[getRandomInt(jobs.length)]}`;
}

playButton.onclick = function() {
  var userInput = prompt("What is your name?", userName);
  if (userInput === null) alert("You cancelled game.");
  else {
    if (userInput !== "") userName = userInput;
    if (confirm("Do you prefer women?")) {
      alert(getMarried("w"));
    } else {
      alert(getMarried("m"));
    }
  }
};
