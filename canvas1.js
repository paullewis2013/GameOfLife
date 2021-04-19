var canvas = document.getElementById("canvas1")

canvas.style.width = window.innerWidth/4 + "px";
canvas.style.height = window.innerHeight/3 + "px";  

var ctx1 = canvas.getContext('2d')

// Set actual size in memory (scaled to account for extra pixel density).
var scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
canvas.width = Math.floor((window.innerWidth/4) * scale);
canvas.height = Math.floor((window.innerHeight/3) * scale);

var life1 = new Life2D()
life1.randomize(0.75)

function drawFrame1(){
    console.log("frame")
    life1.update()
    
    let h = canvas.height/life1.state.length;

    for(let row = 0; row < life1.state.length; row++){
        for(let col = 0; col < life1.state[row].length; col++){
            
            ctx1.beginPath();
            ctx1.rect(col*h, row*h, h, h);
            
            if(life1.state[row][col]){
                ctx1.fillStyle = "#6c71c4";
            }else{
                ctx1.fillStyle = "black";
            }
            ctx1.fill();

        }
    }
}


setInterval(drawFrame1, 100);

