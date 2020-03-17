var arr = [
  { value: 100, type: "USD" },
  { value: 215, type: "EUR" },
  { value: 7, type: "EUR" },
  { value: 99, type: "USD" },
  { value: 354, type: "USD" },
  { value: 12, type: "EUR" },
  { value: 77, type: "USD" }
];

const moneyCount = {
  dollarItem: document.getElementById("usd"),
  euroItem: document.getElementById("eur")
};

function dollarOperation() {
  const dollars = arr.filter(x => x.type === "USD" && x.value < 100);
  let dollarSum = 0;
  let info = "{";
  for (let i = 0; i < dollars.length; i++) {
    dollarSum += dollars[i].value;
    info += `${dollars[i].value}; `;
  }
  info += "}= " + dollarSum;
  moneyCount.dollarItem.innerHTML = info;
  return dollarSum;
}

function euroOperation() {
  let euros = arr.filter(x => x.type === "EUR");
  let info = "";
  for (let i = 0; i < euros.length; i++) {
    euros[i].value *= 2;
    info += `Value: ${euros[i].value}, type: ${euros[i].type}; `;
  }
  moneyCount.euroItem.innerHTML = info;
  return euros;
}

console.log(dollarOperation());
console.log(euroOperation());
