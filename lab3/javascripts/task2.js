const PascalTriangle = {
  pascalTriangleItem: document.getElementById("pascalTriangle"),
  rowsCountItem: document.getElementById("rows"),
  renderButton: document.getElementById("render"),

  renderPascalTriangle: function() {
    const rows = this.rowsCountItem.value;
    if (rows < 0 || rows > 20) alert("Number must be between 0 and 20!");
    else {
      this.pascalTriangleItem.innerHTML = "";
      for (let i = 0; i < rows; i++) {
        const triangleLineElement = document.createElement("div");
        triangleLineElement.className = "itemLine";
        const row = getPascalTriangleLine(i);
        for (let j = 0; j < row.length; j++) {
          const number = document.createElement("div");
          number.className = "pascalTriangleItem";
          number.innerHTML = row[j];
          triangleLineElement.appendChild(number);
        }
        this.pascalTriangleItem.appendChild(triangleLineElement);
      }
    }
  }
};

function getPascalTriangleLine(rowNumber) {
  let row = [];
  for (let col = 0; col < rowNumber + 1; col++) {
    row[col] =
      factorial(rowNumber) / (factorial(col) * factorial(rowNumber - col));
  }
  return row;
}

function factorial(number) {
  if (number >= 1) return number * factorial(number - 1);
  else return 1;
}

PascalTriangle.renderButton.onclick = function() {
  PascalTriangle.renderPascalTriangle();
};
