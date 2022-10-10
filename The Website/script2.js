import {
  navBarSets,
  closingNavBar,
  navBarStatsArrow,
  addingGoalsToSets,
  addingGoalsOnload,
  emptySetVerification,
  nameOfNewSet,
  completingGoalsFromSet,
  removingGoalsFromSet,
  removingSet,
  redirectExistingSets,
} from "./controller.js";
window.onload = function () {
  document.querySelector(".tittle").innerHTML = nameOfNewSet();

  if (
    emptySetVerification(
      localStorage[document.querySelector(".tittle").innerHTML]
    )
  )
    return;
  addingGoalsOnload(document.querySelector(".tittle").innerHTML);
};
let addBtn = document.querySelector(".adder-button");
addBtn.addEventListener("click", () => {
  addingGoalsToSets();
});

document.addEventListener("click", (e) => {
  if (
    e.target.classList.value !== "delete button" &&
    e.target.classList.value !== "complete button" &&
    e.target.classList.value !== "delete-icon"
  ) {
    return;
  }
  if (e.target.classList.value === "delete button") {
    let parentDiv = e.target.parentElement;
    let grandDiv = parentDiv.parentElement;
    removingGoalsFromSet(grandDiv);
  }
  if (e.target.classList.value === "delete-icon") {
    let parentDiv = e.target.parentElement;
    let grandDiv = parentDiv.parentElement;
    let masterDiv = grandDiv.parentElement;
    removingGoalsFromSet(masterDiv);
  }
  if (e.target.classList.value === "complete button") {
    completingGoalsFromSet(e);
  }
});

document.querySelector(".set").addEventListener("click", () => {
  removingSet(document.querySelector(".tittle").innerHTML);
});

let downArrowSet = document.querySelector(".sets-arrow");
downArrowSet.addEventListener("click", (e) => {
  navBarSets(e.target);
});

let navBar = document.querySelector("nav");
navBar.addEventListener("mouseleave", () => {
  closingNavBar();
});

document.addEventListener("click", (e) => {
  redirectExistingSets(e);
});

let statsArrow = document.querySelector(".stat-arrow");
statsArrow.addEventListener("click", (e) => {
  navBarStatsArrow(e.target);
});

let filterBtn = document.querySelector(".filter-btn");
filterBtn.addEventListener("click", () => {
  if (document.querySelector(".drop-down") !== null) {
    if (
      document.querySelector(".drop-down").classList.value ===
      "drop-down two drop-active"
    ) {
      document.querySelector(".drop-down").classList =
        "drop-down two drop-remove";
    }
    if (
      document.querySelector(".drop-down").classList.value ===
      "drop-down  drop-active"
    ) {
      document.querySelector(".drop-down").classList = "drop-down drop-remove";
    }
    document
      .querySelector(".drop-down")
      .addEventListener("webkitAnimationEnd", () => {
        document.querySelector(".drop-down.drop-remove").remove();
        return;
      });
    return;
  }
  let dropDown = document.createElement("div");
  dropDown.classList = "drop-down two drop-active";
  let divOne = document.createElement("div");
  let nameImg = document.createElement("img");
  nameImg.src = "name.png";
  let nameSpan = document.createElement("span");
  nameSpan.innerHTML = "Name";
  divOne.appendChild(nameImg);
  divOne.appendChild(nameSpan);
  let divTwo = document.createElement("div");
  let dateImg = document.createElement("img");
  dateImg.src = "date.png";
  let dateSpan = document.createElement("span");
  dateSpan.innerHTML = "Date";
  divTwo.appendChild(dateImg);
  divTwo.appendChild(dateSpan);
  dropDown.appendChild(divOne);
  dropDown.appendChild(document.createElement("hr"));
  dropDown.appendChild(divTwo);
  document.querySelector(".main-two").appendChild(dropDown);
});

let sortBtn = document.querySelector(".sort-btn");
sortBtn.addEventListener("click", () => {
  if (document.querySelector(".drop-down") !== null) {
    if (
      document.querySelector(".drop-down").classList.value ===
      "drop-down two drop-active"
    ) {
      document.querySelector(".drop-down").classList =
        "drop-down two drop-remove";
    }
    if (
      document.querySelector(".drop-down").classList.value ===
      "drop-down  drop-active"
    ) {
      document.querySelector(".drop-down").classList = "drop-down drop-remove";
    }
    document
      .querySelector(".drop-down")
      .addEventListener("webkitAnimationEnd", () => {
        document.querySelector(".drop-down.drop-remove").remove();
        return;
      });
    return;
  }
  let dropDown = document.createElement("div");
  dropDown.classList = "drop-down  drop-active";
  let divOne = document.createElement("div");
  let asendImg = document.createElement("img");
  asendImg.src = "arrow.png";
  asendImg.classList = "flipped";
  let asendSpan = document.createElement("span");
  asendSpan.innerHTML = "Ascending";
  divOne.appendChild(asendImg);
  divOne.appendChild(asendSpan);
  let divTwo = document.createElement("div");
  let desendImg = document.createElement("img");
  desendImg.src = "arrow.png";
  let desendSpan = document.createElement("span");
  desendSpan.innerHTML = "Descending";
  divTwo.appendChild(desendImg);
  divTwo.appendChild(desendSpan);
  dropDown.appendChild(divOne);
  dropDown.appendChild(document.createElement("hr"));
  dropDown.appendChild(divTwo);
  document.querySelector(".main-two").appendChild(dropDown);
});

let setTittle = document.querySelector(".tittle");
setTittle.addEventListener("mouseover", () => {
  let descriptionDiv = document.createElement("div");
  descriptionDiv.innerHTML = JSON.parse(
    localStorage[document.querySelector(".tittle").innerHTML]
  )["Description"];
  descriptionDiv.classList = "drop-down description-pop description";
  document.querySelector(".main-two").appendChild(descriptionDiv);
});

setTittle.addEventListener("mouseleave", () => {
  let descripPop = document.querySelector(".description");
  descripPop.classList = "drop-down description-remove description";
  descripPop.addEventListener("webkitAnimationEnd", () => {
    descripPop.remove();
    return;
  });
});
