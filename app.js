//holder = sticker holder (empty)
let stickerHolders = 0;
const userPassword = [];

//Random placeholder examples for wish(goal) input
function makeAWish() {
  const myWish = [
    "장난감 사줄게요",
    "놀이공원에 놀러가요🎪",
    "게임하게 해줄게요🎮",
    "치킨 시켜줄게요",
  ];
  const getRandom = Math.floor(Math.random() * myWish.length);
  const randomWish = myWish[getRandom];
  document.querySelector(".goal").placeholder = randomWish;
}
makeAWish(); //로딩 후 실행되면 좋을거같다

//Number Up and Down button (+-) in a set up form
const numberUpButton = document.querySelector(".up");
const numberDownButton = document.querySelector(".down");
numberUpButton.addEventListener("click", numberUpDown);
numberDownButton.addEventListener("click", numberUpDown);

let defaultNumber = 15;
const userNumberInput = document.querySelector(".amount").value;
function numberUpDown(e) {
  e.preventDefault();

  switch (e.target.className) {
    case "up":
      if (defaultNumber == 30) {
        document.querySelector(".amount").value = 30;
      } else {
        defaultNumber++;
        document.querySelector(".amount").value = defaultNumber;
      }
      break;
    case "down":
      if (defaultNumber == 5) {
        document.querySelector(".amount").value = 5;
      } else {
        defaultNumber--;
        document.querySelector(".amount").value = defaultNumber;
      }
      break;
    default:
      console.log("switch error");
      break;
  }
}

//Password checker
const passwordInput = document.querySelector(".password");
passwordInput.addEventListener("submit", (e) => {
  console.log(e);
});

//get the values from user's input (value : goal & total sticker holders)
const submitBtn = document.querySelector(".setup");
submitBtn.addEventListener("submit", (e) => {
  makeBoard(e);
});

function makeBoard(submitData) {
  submitData.preventDefault();
  console.log(submitData);
  const userData = {
    goal: submitData.target[0].value,
    count: submitData.target[2].value,
    password: submitData.target[4].value,
  };
  if (userData.count < 5 || userData.count > 30) {
    alert("최소5~30개 까지 가능합니다");
    document.querySelector(".amount").value = 15;
  } else {
    buildDiv(userData.count);
    background(userData.goal);
    const userForm = document.querySelector(".create-menu");
    userForm.style.display = "none"; //hide menu
  }
}


const boardWrap = document.getElementById("board-wrap");
function background(title) {
  if (title === "") {
    boardWrap.style.backgroundColor = "white";
    console.log("목표가 없어요");
  } else {
    boardWrap.style.backgroundColor = "white";
    console.log(`다 모으면 ${title}`);
  }
}

//make blank holder according to user's total sticker input
function buildDiv(count) {
  stickerHolders = count; //update sticker holder amount
  const boardGrid = document.createElement("div"); //create new board div
  boardGrid.className = "board";
  boardWrap.append(boardGrid);

  //make empty sticker holders.
  for (let i = 1; i <= count; i++) {
    const holderWrap = document.createElement("div"); //create new board div
    holderWrap.className = "holder";
    boardGrid.append(holderWrap);
    const stickerNumber = i;
    holderWrap.append(stickerNumber);
  }
  const mainGrapeImage = new Image();
  mainGrapeImage.src = "/images/main-grape.png";
  boardWrap.append(mainGrapeImage);

  addBtn();
}

const menuButtonsWrap = document.querySelector(".menu-buttons");

//add a sticker button to background.
function addBtn() {
  const newBtn = document.createElement("button");
  newBtn.className = "addBtn";
  newBtn.innerText = "Good Job!";
  const returnBtn = document.createElement("button");
  returnBtn.className = "returnBtn";
  returnBtn.innerText = "Return";
  menuButtonsWrap.prepend(newBtn, returnBtn);
  //event listener for button
  newBtn.addEventListener("click", addSticker);
  returnBtn.addEventListener("click", () => {
    window.location.reload();
  });
}

//add draggable stickers
const newStickers = document.querySelector(".new-stickers");

function addSticker() {
  const sticker = document.createElement("img");
  sticker.src = "/images/sticker.svg";

  if (newStickers.childElementCount >= stickerHolders) {
    alert(`스티커판 보다 스티커가 많아요!😱`);
  } else {
    newStickers.append(sticker);
  }
}

//make stickers draggable
let activeItem = null;
let active = false;

newStickers.addEventListener("touchstart", dragStart, false);
newStickers.addEventListener("touchend", dragEnd, false);
newStickers.addEventListener("touchmove", drag, false);

newStickers.addEventListener("mousedown", dragStart, false);
newStickers.addEventListener("mouseup", dragEnd, false);
newStickers.addEventListener("mousemove", drag, false);

function dragStart(e) {
  console.log(e);
  if (e.target !== e.currentTarget) {
    active = true;

    // this is the item we are interacting with
    activeItem = e.target;

    if (activeItem !== null) {
      if (!activeItem.xOffset) {
        activeItem.xOffset = 0;
      }

      if (!activeItem.yOffset) {
        activeItem.yOffset = 0;
      }

      if (e.type === "touchstart") {
        activeItem.initialX = e.touches[0].clientX - activeItem.xOffset;
        activeItem.initialY = e.touches[0].clientY - activeItem.yOffset;
      } else {
        console.log((activeItem.initialX = e.clientX - activeItem.xOffset));
        activeItem.initialX = e.clientX - activeItem.xOffset;
        activeItem.initialY = e.clientY - activeItem.yOffset;
      }
    }
  }
}

function dragEnd(e) {
  if (activeItem !== null) {
    activeItem.initialX = activeItem.currentX;
    activeItem.initialY = activeItem.currentY;
  }

  active = false;
  activeItem = null;
}

function drag(e) {
  if (active) {
    if (e.type === "touchmove") {
      e.preventDefault();

      activeItem.currentX = e.touches[0].clientX - activeItem.initialX;
      activeItem.currentY = e.touches[0].clientY - activeItem.initialY;
    } else {
      activeItem.currentX = e.clientX - activeItem.initialX;
      activeItem.currentY = e.clientY - activeItem.initialY;
    }

    activeItem.xOffset = activeItem.currentX;
    activeItem.yOffset = activeItem.currentY;

    setTranslate(activeItem.currentX, activeItem.currentY, activeItem);
  }
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}
