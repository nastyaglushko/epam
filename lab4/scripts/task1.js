let border_colors = [
    "img_border img_border-black",
    "img_border img_border-red",
    "img_border img_border-green",
    "img_border img_border-yellow",
    "img_border img_border-blue",
    "img_border img_border-violet",
    "img_border img_border-pink",
    "img_border img_border-orange"
]

const imgChanger = {
    widthInput: document.getElementById("img_width"),
    heightInput: document.getElementById("img_height"),
    frameWidthInput: document.getElementById("img_frameWidth"),
    colorInput: document.getElementById("img_colorSelect"),
    altTextInput: document.getElementById("img_altText"),
    imageElement: document.getElementById("image"),
    submitButton: document.getElementById("submitButton"),

    isValid: true,

    changeBorderColor: function() {
        (this.colorInput.value < 9 && this.colorInput.value > 0) ? this.imageElement.className = border_colors[this.colorInput.value - 1]: this.imageElement.className = "img_border"
    },

    changeBorderSize: function() {
        console.log(this.frameWidthInput.value);
        this.imageElement.style.setProperty(
            "--border-width",
            `${this.frameWidthInput.value}px`
        );
        console.log(this.imageElement.style);
    },

    changeImgSize: function() {
        this.imageElement.width = this.widthInput.value;
        this.imageElement.height = this.heightInput.value;
    },

    changeAlt: function() {
        this.imageElement.alt = this.altTextInput.value;
    },

    isValidNumberInput: function() {
        if (typeof this.widthInput.value != "number" || this.widthInput.value < 0) {
            this.widthInput.setCustomValidity("Неправильне значення.");
            isValid = false;
        }
        if (
            typeof this.heightInput.value != "number" ||
            this.heightInput.value < 0
        ) {
            this.heightInput.setCustomValidity("Неправильне значення.");
            isValid = false;
        }
        if (
            typeof this.frameWidthInput.value != "number" ||
            this.frameWidthInput.value < 0
        ) {
            this.frameWidthInput.setCustomValidity("Неправильне значення.");
            isValid = false;
        }
        isValid = true;
    },

    isValidAltInput: function() {
        isLowerCase = (symbol) => "a" <= symbol && symbol <= "z"
        isUpperCase = (symbol) => "A" <= symbol && symbol <= "Z"

        let inputString = this.altTextInput.value;
        if (!inputString) return false;
        for (let i = 0; i < inputString.length; i++) {
            if (!isLowerCase(inputString[i]) && !isUpperCase(inputString[i])) {
                return false;
            }
        }
        return true;
    }
};

window.addEventListener("load", function() {
    imgChanger.widthInput.value = imgChanger.imageElement.width;
    imgChanger.heightInput.value = imgChanger.imageElement.height;
});

imgChanger.submitButton.addEventListener("click", function() {
    if (imgChanger.isValidAltInput()) {
        if (imgChanger.isValid) {
            imgChanger.changeBorderColor();
            imgChanger.changeBorderSize();
            imgChanger.changeImgSize();
            imgChanger.changeAlt();
        }
    } else imgChanger.altTextInput.setCustomValidity("Містить не латинські символи");
});