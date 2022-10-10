import {
  navBarSets,
  closingNavBar,
  navBarStatsArrow,
  existingSetDisplay,
  redirectExistingSets,
} from "./controller.js";
window.onload = function () {
  let sets = [...localStorage["sets"].split(",")];
  if (localStorage["sets"] === "") {
    window.location = "idex.html";
  }
  existingSetDisplay(document.querySelector(".main-sets-container"), sets);
};
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
