var canvas = document.getElementById("canvas3")

canvas.style.height = window.innerHeight/3 + "px";  
canvas.style.width = canvas.style.height

var ctx3 = canvas.getContext('2d')

// Set actual size in memory (scaled to account for extra pixel density).
var scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
canvas.height = Math.floor((window.innerHeight/3) * scale);
canvas.width = canvas.height;

var life3 = new Life2D()
life3.randomize(0.5)

function drawFrame3(){
    console.log("frame")
    life3.update()
    
    let h = canvas.height/life3.state.length;

    for(let row = 0; row < life3.state.length; row++){
        for(let col = 0; col < life3.state[row].length; col++){
            
            ctx3.beginPath();
            ctx3.rect(col*h, row*h, h, h);
            
            if(life3.state[row][col]){
                ctx3.fillStyle = "#2aa198";
            }else{
                ctx3.fillStyle = "black";
            }
            ctx3.fill();

        }
    }
}


setInterval(drawFrame3, 100);

