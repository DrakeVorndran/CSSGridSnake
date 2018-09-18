function createHtml(size){
    container = document.getElementById("game");
    container.innerHTML = "";
    container.style="grid-template-columns: repeat("+size+",1fr); grid-template-rows: repeat("+size+",1fr);"
    for(var y = 0; y<size; y++){
        // console.log(y);
        for(var x = 0; x<size; x++){
            // console.log("<div class='box' id='"+String(x)+String(y)+"></div>");
            container.innerHTML+="<div class='box' id='"+String(x)+","+String(y)+"'></div>";
        }

    }

}
function createList(size){
    var b = [];
    for(var i = 0; i<size; i++){
        b.push(new Array(size));
        b[i].fill(0);
    }
    b[Math.floor(size/2)][Math.floor(size/2)] = 1;
    return b;
}

function updateHtml(score){
    for(var y = 0; y<board.length; y++){
        for(var x = 0; x<board.length; x++){
            box = document.getElementById(String(x)+","+String(y));
            // console.log(Math.floor(Math.random*colorl.length));
            if(board[y][x]>0){
                box.style.background = colors["green"];
                board[y][x]-=1
            }
            else if(board[y][x]===0){
                box.style.background = colors["black"];
            }

            else if(board[y][x]==="F"){
                box.style.background = colors["red"];

            }
            else{
                box.style.background = colors["yellow"];
                board[y][x]-=1

            }



        }
    }

}

function move(key){
    if(key===97 && dir!=="right"){
        dir = "left";
    }
    else if (key===119 && dir!=="down"){
        dir = "up";
    }
    else if (key===100 && dir!=="left"){
        dir = "right";
    }
    else if (key==115 && dir!=="up"){
        dir = "down";
    }
}

function makefood(){
    posNotFound = true;
    while(posNotFound){
        posfood = [Math.floor(Math.random()*size),Math.floor(Math.random()*size)];
        if(board[posfood[1]][posfood[0]]===0){
            board[posfood[1]][posfood[0]]="F";
            posNotFound=false;
        }
    }
}


function run(){
    updateHtml(score);
    if(dir==="right"){
        head[0]+=1;
    }
    else if(dir==="left"){
        head[0]-=1;
    }
    else if(dir==="up"){
        head[1]-=1;
    }
    else if(dir==="down"){
        head[1]+=1;
    }
    head[0]=head[0]%(size);
    head[1]=head[1]%(size);
    if(head[0]<0){
        head[0]=size-1
    }
    if(head[1]<0){
        head[1]=size-1
    }
    if(board[head[1]][head[0]]==="F"){
        score++;
        document.getElementById("score").innerHTML="Score: "+score;

        makefood();
    }
    else if(board[head[1]][head[0]]!==0){
        running = !running;
    }
    board[head[1]][head[0]]=score;
    if(running){
        window.setTimeout(run,100);
    }
    else{
    }
}

document.onkeypress = function (e) {
    e = e || window.event;
    // use e.keyCode
    move(e.keyCode);
};

var colorl = ["red","black","blue","green","yellow"];

var colors = {
    "black" : "#000",
    "red" : "#F00",
    "green" : "#0F0",
    "blue" : "#00F"
};
var size;
var score;
var board;
var dir;
var head;
var posfood;
var running;
var htmlEmpty = true;

function start(){
    document.getElementById("startButton").disabled=true;
    size = 30;
    score = 1;
    document.getElementById("score").innerHTML="Score: 0";
    board = createList(size);
    dir = null;
    head = [Math.floor(size/2),Math.floor(size/2)];
    posfood = [Math.floor(Math.random()*size),Math.floor(Math.random()*size)];
    running = true
    makefood()
    document.getElementById("startButton").disabled=false;

    if(htmlEmpty){
        createHtml(size);
        htmlEmpty = false;

    }
    run();
}
start()
