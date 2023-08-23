var pieces = [];
var dvds = ["icon/dvdBlue.png", "icon/dvdWhite.png", "icon/dvdYellow.png", "icon/dvdRed.png", "icon/dvdPink.png", "icon/dvdOrange.png", "icon/dvdLBlue.png", "icon/dvdGreen.png"];

window.onresize = function() {
    myGameArea.canvas.width = window.innerWidth;
    myGameArea.canvas.height = window.innerHeight;
}

window.onload = function() {
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
    if (localStorage.getItem("color") == null) {
        localStorage.setItem("color", "Blue");
    }
    startGame();
}

function createDvd(x, y) {
    console.log(localStorage.getItem("color"));
    if (localStorage.getItem("color") == "random") {
        piece = new component(167, 167, dvds[Math.floor(Math.random() * dvds.length)], x-83, y-83, pieces.length);
    } else {
        piece = new component(167, 167, "icon/dvd" + localStorage.getItem("color") + ".png", x-83, y-83, pieces.length);
    }
    pieces.push(piece);
}

function startGame() {
    createDvd(Math.floor(Math.random() * (window.innerWidth-334)+167), Math.floor(Math.random() * (window.innerHeight-334)+167), pieces.length);
    //creates canvas and interval for game
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.onclick = function() {
            createDvd(event.x, event.y);
        }
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        if (localStorage.getItem("rate") == "classic") {
            this.interval = setInterval(updateGameArea, 40);
        } else {
            this.interval = setInterval(updateGameArea, 20);   
        }
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, image, x, y, id) {
    this.id = id;
    this.img = new Image();
    this.img.src = image;
    
    this.cornerHits = 0;
    this.wallHits = 0;
    
    this.lenHits = 0;
    this.hitWall = false;
    this.results = [];
    
    this.width = width;
    this.height = height;
    this.dirX = 8;
    this.dirY = 8;
    this.x = x;
    this.y = y;
    this.update = function(){
        ctx = myGameArea.context;
        changeX = this.dirX;
        changeY = this.dirY;
        if (localStorage.getItem("speed") == "slow") {
            changeX = changeX/2;
            changeY = changeY/2;
        } else if (localStorage.getItem("speed") == "fast") {
            changeX = changeX*2;
            changeY = changeY*2;
        }
        if (localStorage.getItem("rate") == "smooth") {
            changeX = changeX/2;
            changeY = changeY/2;
        }
        this.x += changeX;
        this.y += changeY;
        
        if (this.y <= 0 || this.y >= window.innerHeight-this.height) {
            this.dirY = this.dirY * -1;
            this.wallHits += 1;
            if (this.hitWall == true) {
                this.lenHits += 1;
            }
        }
        if (this.x <= 0 || this.x >= window.innerWidth-this.width) {
            this.dirX = this.dirX * -1;
            this.wallHits += 1;
            if (this.hitWall == true) {
                this.lenHits += 1;
            }
        }
        
        if (this.y <= 0 && this.x <= 0 || this.y >= window.innerHeight-this.height && this.x >= window.innerWidth-this.width || this.y <= 0 && this.x >= window.innerWidth-this.width || this.x <= 0 && this.y >= window.innerHeight-this.height) {
            this.cornerHits += 1;
            if (this.hitWall == true) {
                this.results.push(this.lenHits);
                this.lenHits = 0;
            } else {
                this.hitWall = true;
            }
        }
        
        for (var i=0; i<pieces.length; i++) {
            if (this.id != pieces[i].id) {
                if (this.y >= pieces[i].y && this.y <= pieces[i].y+167 || this.y+167 >= pieces[i].y && this.y+167 <= pieces[i].y+167) {
                    if (this.x == pieces[i].x+167 && this.x+167 <= pieces[i].x+20 || this.x+167 >= pieces[i].x && this.x+167 <= pieces[i].x+20) { // && this.x <= pieces[i].x+8) {
                        this.dirX = this.dirX * -1;
                        pieces[i].dirX = pieces[i].dirX * -1;
                        console.log("xeeeeee");
                    }
                }
                if (this.x >= pieces[i].x && this.x <= pieces[i].x+167 || this.x+167 >= pieces[i].x && this.x+167 <= pieces[i].x+167) {
                    if (this.y == pieces[i].y+167 && this.y+167 <= pieces[i].y+20 || this.y+167 >= pieces[i].y && this.y+167 <= pieces[i].y+20) {// && this.y <= pieces[i].y+8) {
                        this.dirY = this.dirY * -1;
                        pieces[i].dirY = pieces[i].dirY * -1;
                        console.log("yeee");
                    }
                }
            }
        }
        
        
        if (localStorage.getItem("stats") == "on") {
            ctx.font = "14px Arial";
            ctx.fillStyle = "white";
            ctx.fillText("Wall Hits: " + this.wallHits, 20, window.innerHeight-65);
            ctx.fillText("Corner Hits: " + this.cornerHits, 20, window.innerHeight-50);
            if (this.results.length > 0) {
                average = (this.results.reduce( function(total, num) { return total + num; } ))/this.results.length;
                ctx.fillText("Avg Hits for Corner: " + average, 20, window.innerHeight-20);
            } else {
                ctx.fillText("Avg Hits for Corner: Calculating...",20,window.innerHeight-20);
            }
        }
        
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}

function updateGameArea() {
    myGameArea.clear();
    
    //fill screen black;
    ctx = myGameArea.context;
    ctx.beginPath();
    ctx.rect(0, 0, window.innerWidth, window.innerHeight);
    ctx.fillStyle = "black";
    ctx.fill();
    
    //logic and such for dvd icon
    for (var i=0; i<pieces.length; i++) {
        pieces[i].update();
    }
}