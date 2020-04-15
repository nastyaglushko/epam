const nameCellId = 0;
const scoreCellId = 1;

const statsShow = {
    table: document.getElementById("table"),
    diagram: document.getElementById("diagram"),
    addNewButton: document.getElementById("addNewButton"),

    data: [{
            name: "Анікеєв І.",
            score: 65
        },
        {
            name: "Ганайчук М.",
            score: 80
        },
        {
            name: "Глушко А.",
            score: 74
        },
        {
            name: "Грицюк О.",
            score: 70
        },
        {
            name: "Джергалова Р.",
            score: 95
        },
        {
            name: "Жиров Д.",
            score: 99
        }
    ],

    renderData: function() {
        this.clearTable();
        for (let i = 0; i < this.data.length; i++) {
            var row = this.table.insertRow(i + 1);
            var nameCell = row.insertCell(nameCellId);
            row.dataset.id = i;
            nameCell.contentEditable = "true";
            nameCell.dataset.cellNumber = nameCellId;
            var scoreCell = row.insertCell(scoreCellId);
            scoreCell.dataset.cellNumber = scoreCellId;
            scoreCell.contentEditable = "true";
            nameCell.innerHTML = this.data[i].name;
            scoreCell.innerHTML = this.data[i].score;
            var deleteCell = row.insertCell(2);
            const deleteLink = document.createElement("a");
            deleteLink.setAttribute("href", "#");
            deleteLink.innerText = "Delete";
            deleteLink.addEventListener("click", deleteRow);
            deleteCell.appendChild(deleteLink);
        }
    },

    clearTable: function() {
        let length = this.table.rows.length - 1;
        for (let i = 0; i < length; i++) {
            this.table.deleteRow(1);
        }
    },

    changeNameCell: function(index, newName) {
        this.data[index].name = newName;
    },
    changeScoreCell: function(index, newScore) {
        this.data[index].score = newScore;
    },

    getMaxValue: function() {
        let max = 0;
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].score > max) max = this.data[i].score;
        }
        return max;
    },

    renderDiagram: function() {
        this.diagram.innerHTML = "";
        const max = this.getMaxValue() + 5;
        const colWidth = Math.floor(772 / this.data.length);
        for (let i = 0; i < this.data.length; i++) {
            const item = document.createElement("div");
            const info = document.createElement("span");
            info.innerText = this.data[i].score;
            info.style.display = "none";
            item.addEventListener("mouseenter", e => {
                info.style.display = "block";
                info.className = "info";
            });
            item.addEventListener("mouseleave", e => {
                info.style.display = "none";
            });
            item.className = "diagramItem";
            const name = document.createElement("p");
            name.innerText = this.data[i].name;
            const proportion = this.data[i].score / max;
            const proportionHeight = Math.floor(proportion * 300);
            const column = document.createElement("div");
            column.className = "diagramColumn";
            column.style.height = proportionHeight + "px";
            column.style.width = colWidth + "px";
            item.appendChild(info);
            item.appendChild(column);
            item.appendChild(name);
            this.diagram.appendChild(item);
        }
    },

    deleteStudent: function(index) {
        this.data.splice(index, 1);
    },

    addRow: function() {
        this.data.push({ name: "Student", score: 0 });
    }
};

window.addEventListener("load", function() {
    statsShow.renderData();
    statsShow.renderDiagram();
});

statsShow.table.addEventListener("input", function(e) {
    if (e.target.dataset.cellNumber == scoreCellId) {
        statsShow.changeScoreCell(
            e.target.parentElement.dataset.id,
            parseInt(e.target.textContent)
        );
    } else {
        statsShow.changeNameCell(
            e.target.parentElement.dataset.id,
            e.target.textContent
        );
    }
    statsShow.renderData();
    statsShow.renderDiagram();
});

deleteRow = function(e) {
    statsShow.deleteStudent(
        e.target.parentElement.parentElement.dataset.id
    );
    statsShow.renderData();
    statsShow.renderDiagram();
};

statsShow.addNewButton.addEventListener("click", function() {
    statsShow.addRow();
    statsShow.renderData();
    statsShow.renderDiagram();
});