//CHECK FOR  LOCAL STORAGE VALUES
if (localStorage.getItem("speed") == null) {
    localStorage.setItem("speed", "medium");
}
if (localStorage.getItem("rate") == null) {
    localStorage.setItem("rate", "classic");
}
if (localStorage.getItem("stats") == null) {
    localStorage.setItem("stats", "on");
}

console.log(localStorage.getItem("speed") + " " + localStorage.getItem("rate") + " " + localStorage.getItem("stats"));

//SET THE RADIO BUTTONS VALUES
if (localStorage.getItem("speed") == "slow") {
    document.getElementById("slow").checked = true;
    document.getElementById("medium").checked = false;
    document.getElementById("fast").checked = false;
} else if (localStorage.getItem("speed") == "medium") {
    document.getElementById("slow").checked = false;
    document.getElementById("medium").checked = true;
    document.getElementById("fast").checked = false;
} else {
    document.getElementById("slow").checked = false;
    document.getElementById("medium").checked = false;
    document.getElementById("fast").checked = true;
}
if (localStorage.getItem("rate") == "classic") {
    document.getElementById("classic").checked = true;
    document.getElementById("smooth").checked = false;
} else {
    document.getElementById("classic").checked = false;
    document.getElementById("smooth").checked = true;
}
if (localStorage.getItem("stats") == "on") {
    document.getElementById("on").checked = true;
    document.getElementById("off").checked = false;
} else {
    document.getElementById("on").checked = false;
    document.getElementById("off").checked = true;
}

var input = document.getElementsByTagName("option");
for(var i=0;i < input.length; i++) {
    if (input[i].value == localStorage.getItem("color")) {
        document.getElementById("color").value = input[i].value;
    }
}

//ASSIGN EVENT HANDLERS
document.getElementById("color").onchange = function () {
    localStorage.setItem("color", this.value);
}

document.getElementById("slow").onclick = function () {
    localStorage.setItem("speed", "slow");
}
document.getElementById("medium").onchange = function () {
    localStorage.setItem("speed", "medium");
}
document.getElementById("fast").onchange = function () {
    localStorage.setItem("speed", "fast");
}

document.getElementById("classic").onclick = function () {
    localStorage.setItem("rate", "classic");
    clearInterval(myGameArea.interval);
    myGameArea.interval = setInterval(updateGameArea, 40);
}
document.getElementById("smooth").onchange = function () {
    localStorage.setItem("rate", "smooth");
    clearInterval(myGameArea.interval);
    myGameArea.interval = setInterval(updateGameArea, 20);
}

document.getElementById("on").onclick = function () {
    localStorage.setItem("stats", "on");
}
document.getElementById("off").onclick = function () {
    localStorage.setItem("stats", "off");
}