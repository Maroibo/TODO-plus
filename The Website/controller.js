export function navBarSets(element) {
  let downArrowSet = element;
  if (
    localStorage["sets"] === "" ||
    typeof localStorage["sets"] === "undefined"
  )
    return;
  if (downArrowSet.classList.value === "arrows sets-arrow clicked") {
    document.querySelector(".sets-container").innerHTML = "";
    downArrowSet.classList = "arrows sets-arrow";
    return;
  }
  let sets = [...localStorage["sets"].split(",")];
  sets.forEach((element) => {
    let setDiv = document.createElement("div");
    let name = document.createElement("span");
    name.innerHTML = element;
    name.classList = "goal-name";
    setDiv.appendChild(name);
    let itemsNum = document.createElement("span");
    if (
      typeof localStorage[element] === "undefined" ||
      localStorage[element] === ""
    ) {
      itemsNum.innerHTML = `Goals: 0`;
    } else {
      let item = JSON.parse(localStorage[element]);
      itemsNum.innerHTML = `Goals: ${Object.keys(item).length - 1}`;
    }
    itemsNum.classList = "goal-num";
    setDiv.appendChild(itemsNum);
    setDiv.classList = "set-div";
    document.querySelector(".sets-container").appendChild(setDiv);
  });
  downArrowSet.classList = "arrows sets-arrow clicked";
}
export function closingNavBar() {
  document.querySelector(".sets-container").innerHTML = "";
  document.querySelector(".stats-container").innerHTML = "";
  document.querySelector(".sets-arrow").classList = "arrows sets-arrow";
  document.querySelector(".stat-arrow").classList = "arrows stat-arrow";
}

export function redirectExistingSets(e) {
  if (
    e.target.classList.value !== "set-div" &&
    e.target.classList.value !== "goal-num" &&
    e.target.hasAttribute("val") === false
  ) {
    return;
  }
  if (
    (e.target.classList.value === "set-div" ||
      e.target.classList.value === "goal-num") &&
    e.target.hasAttribute("val") === false
  ) {
    if (e.target.classList.value === "set-div") {
      let name = e.target.firstChild.innerHTML;
      localStorage["selected"] = name;
    } else {
      let name1 = e.target.previousSibling.innerHTML;
      localStorage["selected"] = name1;
    }
    window.location = "existing-follow.html";
  }
  if (e.target.hasAttribute("val") === true) {
    console.log("test");
    localStorage["selected"] = e.target.getAttribute("val");
    window.location = "existing-follow.html";
  }
}
export function nameOfNewSet() {
  let sets = [...localStorage.sets.split(",")];
  return sets[sets.length - 1];
}

export function verificationOfSetExistance() {
  if (
    typeof localStorage[document.querySelector(".tittle").innerHTML] ===
    "undefined"
  )
    return false;
  if (
    localStorage[document.querySelector(".tittle").innerHTML].split(",") ===
      0 ||
    localStorage[document.querySelector(".tittle").innerHTML] === ""
  )
    return false;
}

export function addingGoalsOnload(setName) {
  let allSet = JSON.parse(localStorage[setName]);
  for (const key in allSet) {
    if (key === "Date" || key === "Description") continue;
    let goal = document.createElement("div");
    let goalContent = document.createElement("span");
    goalContent.innerHTML = key;
    goalContent.classList = "goal-content";
    let viewDate = document.createElement("span");
    let set = JSON.parse(
      localStorage[document.querySelector(".tittle").innerHTML]
    );
    let date = set[key]["Date"];
    viewDate.innerHTML = `${new Date(date).toLocaleDateString()}     ${new Date(
      date
    ).toLocaleTimeString()}`;
    viewDate.classList = "date-content";
    goal.appendChild(goalContent);
    goal.appendChild(viewDate);
    goal.classList = "goal";
    let completeBtn = document.createElement("button");
    completeBtn.innerHTML = "Completed";
    completeBtn.classList = "complete button";
    let editBtn = document.createElement("button");
    let editIcon = document.createElement("img");
    editIcon.src = "edit.png";
    editIcon.classList = "edit-icon";
    editBtn.appendChild(editIcon);
    editBtn.classList = "edit button";
    let delBtn = document.createElement("button");
    let delIcon = document.createElement("img");
    delIcon.src = "delete.png";
    delIcon.classList = "delete-icon";
    delBtn.appendChild(delIcon);
    delBtn.classList = "delete button";
    completeBtn.innerHTML = "Completed";
    completeBtn.classList = "complete button";
    let goalsBtns = document.createElement("div");
    goalsBtns.appendChild(completeBtn);
    goalsBtns.appendChild(editBtn);
    goalsBtns.appendChild(delBtn);
    goalsBtns.classList = "goal-buttons";
    goal.appendChild(goalsBtns);
    let breaker = document.createElement("hr");
    goal.appendChild(breaker);
    if (allSet[key]["Status"] === true) {
      let lineCross = document.createElement("div");
      lineCross.classList = "dash";
      lineCross.style.width = `${goalContent.innerHTML.length * 10}px`;
      goal.appendChild(lineCross);
      completeBtn.style.backgroundColor = "#32C732";
    }
    document.querySelector(".reverse").appendChild(goal);
  }
}

export function addingGoalsToSets() {
  if (document.querySelector(".goal-text-box").value !== "") {
    if (
      localStorage[document.querySelector(".tittle").innerHTML] !== "" &&
      typeof localStorage[document.querySelector(".tittle").innerHTML] !==
        "undefined"
    ) {
      let allGoals = JSON.parse(
        localStorage[document.querySelector(".tittle").innerHTML]
      );
      if (
        // add a well made alert
        // for duplicate
        typeof allGoals[document.querySelector(".goal-text-box").value] !==
        "undefined"
      ) {
        document.querySelector(".goal-text-box").value = "";
        return;
      }
    }
    let goalsSet = JSON.parse(
      localStorage[document.querySelector(".tittle").innerHTML]
    );
    let goalName = document.querySelector(".goal-text-box").value;
    goalsSet[goalName] = { Date: Date.now(), Status: false };
    localStorage[document.querySelector(".tittle").innerHTML] =
      JSON.stringify(goalsSet);
    let goal = document.createElement("div");
    let goalContent = document.createElement("span");
    goalContent.innerHTML = document.querySelector(".goal-text-box").value;
    goalContent.classList = "goal-content";
    let viewDate = document.createElement("span");
    let set = JSON.parse(
      localStorage[document.querySelector(".tittle").innerHTML]
    );
    let date = set[document.querySelector(".goal-text-box").value]["Date"];
    viewDate.innerHTML = `${new Date(date).toLocaleDateString()}     ${new Date(
      date
    ).toLocaleTimeString()}`;
    viewDate.classList = "date-content";
    goal.appendChild(goalContent);
    goal.appendChild(viewDate);
    goal.classList = "goal";
    let completeBtn = document.createElement("button");
    completeBtn.innerHTML = "Completed";
    completeBtn.classList = "complete button";
    let editBtn = document.createElement("button");
    let editIcon = document.createElement("img");
    editIcon.src = "edit.png";
    editIcon.classList = "edit-icon";
    editBtn.appendChild(editIcon);
    editBtn.classList = "edit button";
    let delBtn = document.createElement("button");
    let delIcon = document.createElement("img");
    delIcon.src = "delete.png";
    delIcon.classList = "delete-icon";
    delBtn.appendChild(delIcon);
    delBtn.classList = "delete button";
    completeBtn.innerHTML = "Completed";
    completeBtn.classList = "complete button";
    let goalsBtns = document.createElement("div");
    goalsBtns.appendChild(completeBtn);
    goalsBtns.appendChild(editBtn);
    goalsBtns.appendChild(delBtn);
    goalsBtns.classList = "goal-buttons";
    goal.appendChild(goalsBtns);
    let breaker = document.createElement("hr");
    goal.appendChild(breaker);
    document.querySelector(".reverse").appendChild(goal);
    document.querySelector(".goal-text-box").value = "";
  }
}

export function removingGoalsFromSet(grandDiv) {
  let goalsObj = JSON.parse(
    localStorage[document.querySelector(".tittle").innerHTML]
  );
  for (const key in goalsObj) {
    if (key === "Date" || key === "Description") continue;
    let div = grandDiv.firstChild.textContent;
    if (div === key) {
      delete goalsObj[key];
      break;
    }
  }
  localStorage[document.querySelector(".tittle").innerHTML] =
    JSON.stringify(goalsObj);
  grandDiv.remove();
}

export function completingGoalsFromSet(e) {
  let parentDiv = e.target.parentElement;
  let grandDiv = parentDiv.parentElement;
  let content = grandDiv.firstChild;
  if (
    grandDiv.lastChild.classList.value === "dash animated" ||
    grandDiv.lastChild.classList.value === "dash"
  )
    return;
  let completeDash = document.createElement("div");
  completeDash.classList = "dash animated";
  completeDash.style.width = `${content.offsetWidth + 3}px`;
  grandDiv.appendChild(completeDash);
  e.target.style.backgroundColor = "#32C732";
  let compTxt = grandDiv.firstChild.textContent;
  let goals = JSON.parse(
    localStorage[document.querySelector(".tittle").innerHTML]
  );
  for (const key in goals) {
    if (key === "Date" || key === "Description") continue;
    if (key === compTxt) {
      goals[key]["Status"] = true;
    }
  }
  localStorage[document.querySelector(".tittle").innerHTML] =
    JSON.stringify(goals);
}

export function removingSet(setName) {
  if (window.confirm("Are You Sure You Want To Delete This Set")) {
    localStorage.removeItem(document.querySelector(".tittle").innerHTML);
    let sets = localStorage["sets"].split(",");
    sets.splice(sets.indexOf(setName), 1);
    sets.join(",");
    localStorage["sets"] = sets;
    window.location = "existing-set.html";
  }
}

export function navBarSetsArrow() {
  if (emptyStringVerification(localStorage["sets"])) return;
  if (downArrowSet.classList.value === "arrows sets-arrow clicked") {
    document.querySelector(".sets-container").innerHTML = "";
    downArrowSet.classList = "arrows sets-arrow";
    return;
  }
  sets = [...localStorage["sets"].split(",")];
  sets.forEach((element) => {
    let setDiv = document.createElement("div");
    let name = document.createElement("span");
    name.innerHTML = element;
    name.classList = "goal-name";
    setDiv.appendChild(name);
    let itemsNum = document.createElement("span");
    if (emptySetVerification(element)) {
      itemsNum.innerHTML = `Goals: 0`;
    } else {
      let item = JSON.parse(localStorage[element]);
      itemsNum.innerHTML = `Goals: ${Object.keys(item).length - 1}`;
    }
    itemsNum.classList = "goal-num";
    setDiv.appendChild(itemsNum);
    setDiv.classList = "set-div";
    document.querySelector(".sets-container").appendChild(setDiv);
  });
  downArrowSet.classList = "arrows sets-arrow clicked";
}

export function emptySetVerification(element) {
  let count = 0;
  for (let key in JSON.parse(element)) {
    if (key === "Date" || key === "Description") continue;
    count++;
  }
  if (count === 0) return true;
  return false;
}

export function emptyStringVerification(element) {
  if (element === "" || typeof element === "undefined") return true;
  return false;
}

export function existingSetDisplay(container, sets) {
  sets.forEach((element) => {
    container.appendChild(creatingNewSets(element));
  });
}
export function existingSetRedirection(e) {
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
}

export function navBarStatsArrow(statsArrow) {
  if (emptyStringVerification(localStorage["sets"])) return;
  if (statsArrow.classList.value === "arrows stat-arrow clicked") {
    document.querySelector(".stats-container").innerHTML = "";
    statsArrow.classList = "arrows stat-arrow";
    return;
  }
  let sets = [...localStorage["sets"].split(",")];
  sets.forEach((e) => {
    let percentage = "0%";
    if (localStorage[e] !== "" && typeof localStorage[e] !== "undefined") {
      let goals = JSON.parse(localStorage[e]);
      if (Object.keys(goals).length !== 0) {
        let count = 0;
        for (const key in goals) {
          if (key === "Date" || key === "Description") continue;
          if (goals[key]["Status"] === true) count++;
        }
        if (count !== 0) {
          percentage = `${Math.round(
            (count / (Object.keys(goals).length - 2)) * 100
          )}%`;
        }
      }
    }
    let containerDiv = document.createElement("div");
    let completionDiv = document.createElement("div");
    let nameSpan = document.createElement("span");
    let percentageSpan = document.createElement("span");
    nameSpan.innerHTML = `${e}`;
    percentageSpan.innerHTML = `${percentage}`;
    containerDiv.appendChild(nameSpan);
    containerDiv.appendChild(percentageSpan);
    containerDiv.appendChild(completionDiv);
    containerDiv.classList = "stat-div";
    completionDiv.classList = "stat-bar";
    document.querySelector(".stats-container").appendChild(containerDiv);
    if (
      parseInt(percentage.slice(0, -1)) > 30 &&
      parseInt(percentage.slice(0, -1)) < 65
    ) {
      containerDiv.style.color = "#FFBF00";
      completionDiv.style.backgroundColor = "#FFBF00";
      completionDiv.style.width = `${percentage}`;
    } else if (
      parseInt(percentage.slice(0, -1)) > 65 &&
      parseInt(percentage.slice(0, -1)) <= 100
    ) {
      containerDiv.style.color = "#26aa26";
      completionDiv.style.backgroundColor = "#26aa26";
      completionDiv.style.width = percentage;
    } else {
      containerDiv.style.color = "#ff5833";
      completionDiv.style.backgroundColor = "#ff5833";
      if (parseInt(percentage.slice(0, -1)) > 10) {
        completionDiv.style.width = percentage;
      } else {
        completionDiv.style.width = "5%";
      }
    }
  });
  statsArrow.classList = "arrows stat-arrow clicked";
}

function creatingNewSets(element) {
  let MainDiv = document.createElement("div");
  MainDiv.setAttribute("val", `${element}`);
  MainDiv.classList = "exp-set";
  let wrapperDiv = document.createElement("div");
  wrapperDiv.setAttribute("val", `${element}`);
  wrapperDiv.classList = "exp-wrapper-one";
  let setTittle = document.createElement("span");
  setTittle.setAttribute("val", `${element}`);
  setTittle.innerHTML = element;
  setTittle.classList = "exp-set-name";
  let progressBar = document.createElement("div");
  progressBar.setAttribute("val", `${element}`);
  progressBar.classList = "exp-progress-bar";
  let progressFill = document.createElement("div");
  progressFill.setAttribute("val", `${element}`);
  progressFill.classList = "fill";
  let percentage = "0%";
  if (
    localStorage[element] !== "" &&
    typeof localStorage[element] !== "undefined"
  ) {
    let goals = JSON.parse(localStorage[element]);
    if (Object.keys(goals).length !== 0) {
      let count = 0;
      for (const key in goals) {
        if (key === "Date" || key === "Description") continue;
        if (goals[key]["Status"] === true) count++;
      }
      if (count !== 0) {
        percentage = `${Math.round(
          (count / (Object.keys(goals).length - 2)) * 100
        )}%`;
      }
    }
  }
  let progressResults = progressFiller(percentage);
  let percentDiv = document.createElement("span");
  percentDiv.setAttribute("val", `${element}`);
  percentDiv.innerHTML = percentage;
  if (Number(percentage.substring(0, percentage.length - 1)) <= 40) {
    percentDiv.style.color = `${progressResults[0]}`;
  } else if (Number(percentage.substring(0, percentage.length - 1)) === 50) {
    percentDiv.style.color = `rgb(185 139 2)`;
  } else {
    percentDiv.style.color = `#eee`;
  }
  progressFill.style.backgroundColor = `${progressResults[0]}`;
  progressBar.style.borderColor = `${progressResults[0]}`;
  if (Number(percentage.substring(0, percentage.length - 1)) < 10) {
    progressFill.style.width = `5%`;
  } else {
    progressFill.style.width = percentage;
  }
  progressBar.appendChild(progressFill);
  progressBar.appendChild(percentDiv);
  let editIcon = document.createElement("img");
  editIcon.setAttribute("val", `${element}`);
  editIcon.src = "edit.png";
  wrapperDiv.appendChild(setTittle);
  let upperWrap = document.createElement("div");
  upperWrap.setAttribute("val", `${element}`);
  upperWrap.appendChild(progressBar);
  upperWrap.appendChild(editIcon);
  wrapperDiv.appendChild(upperWrap);
  MainDiv.appendChild(wrapperDiv);
  let descriptionSpan = document.createElement("span");
  descriptionSpan.setAttribute("val", `${element}`);
  descriptionSpan.innerHTML = JSON.parse(localStorage[element])["Description"];
  descriptionSpan.classList = "exp-set-description";
  MainDiv.appendChild(descriptionSpan);
  let bottomContainer = document.createElement("div");
  bottomContainer.setAttribute("val", `${element}`);
  bottomContainer.classList = "exp-wrapper";
  let setObj = JSON.parse(localStorage[element]);
  let recentGoal = "";
  if (Object.keys(setObj).length > 2) {
    recentGoal = Object.keys(setObj)[Object.keys(setObj).length - 1];
  } else {
    recentGoal = "NO RECENT GOALS";
  }
  let recentDiv = document.createElement("div");
  recentDiv.setAttribute("val", `${element}`);
  recentDiv.innerHTML = `Recent Goal:${recentGoal}`;
  let dateDiv = document.createElement("div");
  dateDiv.innerHTML = new Date(
    JSON.parse(localStorage[element])["Date"]
  ).toLocaleDateString();
  recentDiv.classList = "exp-set-recent";
  dateDiv.classList = "exp-set-date";
  bottomContainer.appendChild(recentDiv);
  bottomContainer.appendChild(dateDiv);
  MainDiv.appendChild(bottomContainer);
  let hoverContainer = document.createElement("div");
  hoverContainer.setAttribute("val", `${element}`);
  hoverContainer.classList = "exp-hover-container";
  let goalNums = document.createElement("span");
  goalNums.setAttribute("val", `${element}`);
  goalNums.innerHTML = `Goals:${Object.keys(setObj).length - 2}`;
  let recentHover = document.createElement("span");
  recentHover.setAttribute("val", `${element}`);
  recentHover.innerHTML = `Recent Goal:${recentGoal}`;
  recentHover.classList = "back-recent";
  hoverContainer.appendChild(goalNums);
  hoverContainer.appendChild(recentHover);
  let progressRing = document.createElement("div");
  progressRing.setAttribute("val", `${element}`);
  progressRing.classList = "ring";
  let progresSvg = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  progresSvg.setAttribute("val", `${element}`);
  progresSvg.classList = "exp-progress-ring";
  let circleProgress = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  circleProgress.setAttribute("val", `${element}`);
  circleProgress.setAttributeNS(null, "cx", "50");
  circleProgress.setAttributeNS(null, "cy", "50");
  circleProgress.setAttributeNS(null, "r", "50");
  let circleProgress1 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "circle"
  );
  circleProgress1.setAttribute("val", `${element}`);
  circleProgress1.setAttributeNS(null, "cx", "50");
  circleProgress1.setAttributeNS(null, "cy", "50");
  circleProgress1.setAttributeNS(null, "r", "50");
  circleProgress1.style.stroke = `${progressResults[0]}`;
  circleProgress1.style.strokeDashoffset = `${progressResults[1]}`;
  progresSvg.appendChild(circleProgress);
  progresSvg.appendChild(circleProgress1);
  progressRing.appendChild(progresSvg);
  let percentHover = document.createElement("span");
  percentHover.setAttribute("val", `${element}`);
  percentHover.innerHTML = percentage;
  percentHover.style.color = `${progressResults[0]}`;
  progressRing.appendChild(percentHover);
  hoverContainer.appendChild(progressRing);
  MainDiv.appendChild(hoverContainer);
  return MainDiv;
}

function progressFiller(percentage) {
  let numPercentage = Number(percentage.substring(0, percentage.length - 1));
  let color = "";
  let fill = 0;
  if (numPercentage > 30 && numPercentage < 65) {
    color = "#FFBF00";
    fill = 314 - (314 * numPercentage) / 100;
  } else if (numPercentage > 65 && numPercentage <= 100) {
    color = "#26aa26";
    fill = 314 - (314 * numPercentage) / 100;
  } else {
    if (numPercentage > 10) {
      color = "#F2667F";
      fill = 314 - (314 * numPercentage) / 100;
    } else {
      color = "#F2667F";
      fill = 314 - (314 * 5) / 100;
    }
  }
  return [color, fill];
}
