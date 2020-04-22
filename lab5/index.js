function httpGet(url){
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = function () {
            if (this.status === 200) {
                resolve(this.response);
            } else {
                const error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };
        xhr.onerror = function () {
            reject(new Error("Network Error"));
        };
        xhr.send();
    })
}

const gallery = document.getElementById("gallery");

let imagesPerRow = 5;
let urlLoadFirst = "https://randomuser.me/api/?results=50";
let urlLoadMore = "https://randomuser.me/api/?results=25";
if (window.innerWidth < 1024) {
    imagesPerRow = 3;
    urlLoadFirst = "https://randomuser.me/api/?results=30";
    urlLoadMore = "https://randomuser.me/api/?results=15";
}

// Loading first 50 images
httpGet(urlLoadFirst)
    .then(res => addImages(JSON.parse(res).results))
    .catch(err => alert(err));

document.body.onscroll = function () {
    // When scrolled to the bottom of the page
    if (Math.round(window.innerHeight + window.scrollY) === getDocHeight())
    {
        const loader = document.getElementById("loader");
        loader.style.visibility = "visible";
        httpGet(urlLoadMore)
            .then(res => {
                addImages(JSON.parse(res).results);
                loader.style.visibility = "hidden";
            })
            .catch(err => alert(err));
    }
};

function addImages(randomResultsArr) {
    for (let i = 0; i < randomResultsArr.length / imagesPerRow; i++) {
        const row = createRow();
        for (let j = (imagesPerRow)*i; j < imagesPerRow*(i+1); j++) {
            const image = createImage(randomResultsArr[j].picture.large);
            row.appendChild(image);
        }
        gallery.appendChild(row);
    }
}

function createRow() {
    const row = document.createElement("div");
    row.className = "gallery__row";
    return row;
}

function createImage(imgUrl) {
    const img = document.createElement("img");
    img.src = imgUrl;
    img.className = "gallery__image";
    return img;
}

function getDocHeight() {
    const doc = document;
    return Math.max(
        doc.body.scrollHeight, doc.documentElement.scrollHeight,
        doc.body.offsetHeight, doc.documentElement.offsetHeight,
        doc.body.clientHeight, doc.documentElement.clientHeight
    );
}
