import {
  navBarSets,
  closingNavBar,
  navBarStatsArrow,
  emptySetVerification,
  emptyStringVerification,
} from "./controller.js";
let newSetBtn = document.querySelector(".new-set");
newSetBtn.addEventListener("click", () => {
  let nameWindow = document.querySelector(".set-name-window");
  if (nameWindow.classList.length === 2) {
    nameWindow.classList = "set-name-window";
  } else {
    nameWindow.classList = "set-name-window active";
  }
});
let submitBtn = document.querySelector(".submit-button");
submitBtn.addEventListener("click", () => {
  if (
    document.querySelector(".new-set-name").value !== "" &&
    document.querySelector(".new-set-description").value !== ""
  ) {
    if (localStorage.sets !== "" && typeof localStorage.sets !== "undefined") {
      let sets = localStorage["sets"].split();
      if (sets.indexOf(document.querySelector(".new-set-name").value) !== -1) {
        localStorage["selected"] =
          document.querySelector(".new-set-name").value;
        document.querySelector(".new-set-name").value = "";
        //alert
        window.location = "existing-follow.html";
      } else {
        localStorage.sets += `,${
          document.querySelector(".new-set-name").value
        }`;
      }
    } else {
      localStorage.sets = `${document.querySelector(".new-set-name").value}`;
    }
    let setData = {};
    setData["Date"] = Date.now();
    setData["Description"] = document.querySelector(
      ".new-set-description"
    ).value;
    setData = JSON.stringify(setData);
    localStorage[document.querySelector(".new-set-name").value] = setData;
    document.querySelector(".new-set-name").value = "";
    window.location = "new-set.html";
  }
});

let exsBtn = document.querySelector(".ex-set");
exsBtn.addEventListener("click", (e) => {
  if (emptyStringVerification(localStorage["sets"])) {
    window.alert("There are no existing sets,Create a set first");
    return;
  }
  window.location = "existing-set.html";
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
  if (
    e.target.classList.value !== "set-div" &&
    e.target.classList.value !== "goal-num"
  )
    return;
  if (e.target.classList.value === "set-div") {
    let name = e.target.firstChild.innerHTML;
    localStorage["selected"] = name;
  } else {
    let name1 = e.target.previousSibling.innerHTML;
    localStorage["selected"] = name1;
  }
  window.location = "existing-follow.html";
});

let statsArrow = document.querySelector(".stat-arrow");
statsArrow.addEventListener("click", (e) => {
  navBarStatsArrow(e.target);
});
