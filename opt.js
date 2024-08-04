//CHECK FOR  LOCAL STORAGE VALUES
if (!localStorage.getItem("speed")) localStorage.setItem("speed", "medium");
if (!localStorage.getItem("rate")) localStorage.setItem("rate", "smooth");
if (!localStorage.getItem("stats")) localStorage.setItem("stats", "on");

//SET THE RADIO BUTTONS VALUES
const speed = localStorage.getItem("speed")
if (speed == "slow") {
  document.getElementById("slow").checked = true;
  document.getElementById("medium").checked = false;
  document.getElementById("fast").checked = false;
} else if (speed == "medium") {
  document.getElementById("slow").checked = false;
  document.getElementById("medium").checked = true;
  document.getElementById("fast").checked = false;
} else {
  document.getElementById("slow").checked = false;
  document.getElementById("medium").checked = false;
  document.getElementById("fast").checked = true;
}

const rate = localStorage.getItem("rate")
if (rate == "classic") {
  document.getElementById("classic").checked = true;
  document.getElementById("smooth").checked = false;
} else {
  document.getElementById("classic").checked = false;
  document.getElementById("smooth").checked = true;
}

const stats = localStorage.getItem("stats")
if (stats == "on") {
  document.getElementById("on").checked = true;
  document.getElementById("off").checked = false;
} else {
  document.getElementById("on").checked = false;
  document.getElementById("off").checked = true;
}

document.getElementById("color").value = localStorage.getItem("color");
document.getElementById("background-color").value = localStorage.getItem("background-color");

//ASSIGN EVENT HANDLERS
document.getElementById("color").onchange = (e) => {
  localStorage.setItem("color", e.target.value);
};
document.getElementById("background-color").onchange = (e) => {
  localStorage.setItem("background-color", e.target.value);
	backgroundColor = e.target.value !== "random" ? e.target.value : `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
};
document.getElementById("slow").onclick = () => {
  localStorage.setItem("speed", "slow");
};
document.getElementById("medium").onchange = () => {
  localStorage.setItem("speed", "medium");
};
document.getElementById("fast").onchange = () => {
  localStorage.setItem("speed", "fast");
};

document.getElementById("classic").onclick = function () {
  localStorage.setItem("rate", "classic");
  clearInterval(myGameArea.interval);
  myGameArea.interval = setInterval(updateGameArea, 40);
};
document.getElementById("smooth").onchange = function () {
  localStorage.setItem("rate", "smooth");
  clearInterval(myGameArea.interval);
  myGameArea.interval = setInterval(updateGameArea, 20);
};

document.getElementById("on").onclick = function () {
  localStorage.setItem("stats", "on");
};
document.getElementById("off").onclick = function () {
  localStorage.setItem("stats", "off");
};

function teleport(e) {
  if (e.innerHTML == "options") {
    document.getElementById("settings-container").style.display = "block";
    document.getElementById("selection-container").style.display = "none";
  } else {
    document.getElementById("settings-container").style.display = "none";
    document.getElementById("selection-container").style.display = "block";
  }
}

document.getElementById("disable-extension").onclick = function () {
	chrome.management.getSelf((extensionInfo) => {
    chrome.management.setEnabled(extensionInfo.id, false);
  });
}
