import myJson from './data.json' assert {type: 'json'};

let currentID = 0;
const totalItems = myJson.length;
const leftColumn = document.querySelector(".grid-items-left");

const adjustText = function (text, maxPossibleLength = 20) {
    if (text.length > maxPossibleLength) {
        let removeLen = text.length - maxPossibleLength + 3;
        text = text.slice(0, Math.floor(maxPossibleLength / 2))
            + "..."
            + text.slice(Math.floor(maxPossibleLength / 2) + removeLen, text.length);
    }
    return text;
}

const onClick = function (event, item) {
    document.querySelector(".image").setAttribute("src", item.previewImage);
    document.getElementsByName("imageName")[0].value = item.title;
    const olditem = document.getElementById(currentID);
    olditem.classList.remove("active");
    const newitem = document.getElementById(item.id);
    newitem.classList.add("active");
    currentID = item.id;
}

myJson.forEach((item) => {
    let insertItem = document.createElement("div");
    insertItem.classList.add("grid-item-left");
    insertItem.setAttribute("id", item.id);
    let content = `
        <img src= ${item.previewImage} />
        <p> ${adjustText(item.title)} </p>
    `;

    insertItem.addEventListener("click", (event) => {
        onClick(event, item);
    }
        , false);

    insertItem.innerHTML = content;
    leftColumn.append(insertItem);
});

const showCurrentImage = function () {
    const currentItem = myJson.find((item) =>
        item.id === currentID
    );
    onClick(null, currentItem);
}
showCurrentImage();

document.body.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
        const olditem = document.getElementById(currentID);
        olditem.classList.remove("active");
        currentID = (currentID + 1) % totalItems;
        const newitem = document.getElementById(currentID);
        newitem.classList.add("active");
        showCurrentImage();
    }
    else if (event.key === "ArrowUp") {
        const olditem = document.getElementById(currentID);
        olditem.classList.remove("active");
        if (currentID === 0) {
            currentID = totalItems - 1;
        } else {
            currentID = (currentID - 1) % totalItems;
        }
        const newitem = document.getElementById(currentID);
        newitem.classList.add("active");
        showCurrentImage();
    }
});

const imageText = document.getElementsByName("imageName");
imageText[0].addEventListener('change', (event) => {
    console.log(imageText[0].value);
    myJson.forEach((item) => {
        if (item.id === currentID) {
            item.title = imageText[0].value;
        }
    });
    document.querySelector(".active p").innerText = adjustText(imageText[0].value);
});
