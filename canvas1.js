var canvas = document.getElementById("canvas1")

canvas.style.height = window.innerHeight * 33/100 + "px";  
canvas.style.width = canvas.style.height

var ctx1 = canvas.getContext('2d')

// Set actual size in memory (scaled to account for extra pixel density).
var scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
canvas.height = Math.floor((window.innerHeight/3) * scale);
canvas.width = canvas.height;

// var life1 = new Life2D(48)
// life1.randomize(0.5)

function drawFrame1(){
    // life1.update()
    
    let h = canvas.height/(lifeMain.state.length );

    for(let row = 0; row < lifeMain.state.length; row++){
        for(let col = 0; col < lifeMain.state[row].length; col++){
            
            ctx1.beginPath();
            ctx1.rect(col*h, row*h, h, h);
            
            if(lifeMain.state[col][row]){
                ctx1.fillStyle = "white";
            }else{
                ctx1.fillStyle = "#" + currColer.toString(16);
            }
            ctx1.fill();

        }
    }
}


// setInterval(drawFrame1, 150);

