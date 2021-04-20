var canvas = document.getElementById("canvas1")

canvas.style.height = window.innerHeight/3 + "px";  
canvas.style.width = canvas.style.height

var ctx1 = canvas.getContext('2d')

// Set actual size in memory (scaled to account for extra pixel density).
var scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
canvas.height = Math.floor((window.innerHeight/3) * scale);
canvas.width = canvas.height;

var life1 = new Life2D(40)
life1.randomize(0.5)

function drawFrame1(){
    life1.update()
    
    let h = canvas.height/(life1.state.length * 1.55);

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


setInterval(drawFrame1, 150);

