import myJson from './data.json' assert {type: 'json'};

let currentID = 0;                  // hold the id of the current selected image
const totalItems = myJson.length;   // Total items in the JSON file.
const leftColumn = document.querySelector(".grid-items-left");

/*
    Function adjustText():
    Adjust the input text in the maximum possible length
 */
const adjustText = function (text, maxPossibleLength = 20) {
    if (text.length > maxPossibleLength) {
        let removeLen = text.length - maxPossibleLength + 3;
        text = text.slice(0, Math.floor(maxPossibleLength / 2))
            + "..."
            + text.slice(Math.floor(maxPossibleLength / 2) + removeLen, text.length);
    }
    return text;
}

/*
    Function changeImage():
    Takes the ID of new selected image in the input
    Set the image and the title in the right coloumn to the new selected image
    Remove class 'active' from old image
    Add class 'active' to new image selected
    Update currentID to id of current selected image
*/
const changeImage = function (newID) {
    const item = myJson[newID];
    document.querySelector(".image").setAttribute("src", item.previewImage);
    document.getElementsByName("imageName")[0].value = item.title;
    document.getElementById(currentID).classList.remove("active");
    document.getElementById(newID).classList.add("active");
    currentID = newID;
}

/*
    For each objet in data object in 'data.json'
    Insert new elemet to left column with image and title
    Add 'click'-eventListner to each element and redirect the event to chageImage
*/
let temp = 0;
myJson.forEach((item) => {
    let insertItem = document.createElement("div");
    insertItem.classList.add("grid-item-left");
    insertItem.setAttribute("id", temp++);
    let content = `
        <img src= ${item.previewImage} />
        <p> ${adjustText(item.title)} </p>
    `;
    insertItem.addEventListener("click", function () {
        changeImage(parseInt(this.getAttribute("id")));
    }
        , false);

    insertItem.innerHTML = content;
    leftColumn.append(insertItem);
});

/*
    Select the first image as the default.
*/
changeImage(0);

/*
    Add eventListner to listen the ArrowUp and ArrowDown key
    Calculate the newID of the Image
    Change the image of right coloumn to the newly calculated ID.
*/
document.body.addEventListener("keydown", (event) => {
    let newID;
    if (event.key === "ArrowDown") {
        newID = (currentID + 1) % totalItems;
        changeImage(newID);
    }
    else if (event.key === "ArrowUp") {
        if (currentID === 0) {
            newID = totalItems - 1;
        } else {
            newID = (currentID - 1) % totalItems;
        }
        changeImage(newID);
    }
});

/*
    Add 'change'-eventListener to the inpt field of the imageName
    Update the imageTitle in data.json
    And reflet the updated imageTitle in the image list in the left coloumn
*/
const imageText = document.getElementsByName("imageName");
imageText[0].addEventListener('input', () => {
    myJson[currentID].title = imageText[0].value;
    document.querySelector(".active p").innerText = adjustText(imageText[0].value);
});
