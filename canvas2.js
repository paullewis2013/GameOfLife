var canvas = document.getElementById("canvas2")

canvas.style.height = window.innerHeight/3 + "px";  
canvas.style.width = canvas.style.height

var ctx2 = canvas.getContext('2d')

// Set actual size in memory (scaled to account for extra pixel density).
var scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
canvas.height = Math.floor((window.innerHeight/3) * scale);
canvas.width = canvas.height;

var life2 = new Life2D()
life2.randomize(0.5)


function drawFrame2(){
    console.log("frame")
    life2.update()
    
    
    let h = canvas.height/life2.state.length;

    for(let row = 0; row < life2.state.length; row++){
        for(let col = 0; col < life2.state[row].length; col++){
            
            ctx2.beginPath();
            ctx2.rect(col*h, row*h, h, h);
            
            if(life2.state[row][col]){
                ctx2.fillStyle = "#268bd2";
            }else{
                ctx2.fillStyle = "black";
            }
            ctx2.fill();

        }
    }
}


setInterval(drawFrame2, 100);

