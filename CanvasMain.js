const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 70, (.75*window.innerWidth) / window.innerHeight, 0.1, 1000 );

canvas = document.getElementById("canvasMain")

const renderer = new THREE.WebGLRenderer({canvas: canvas, alpha: true});
renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial( { color: 	randColor(), wireframe: true } );


camera.position.z = 45;
camera.position.y = 95;
camera.position.x = 10;
camera.rotation.x = -1;
camera.rotation.z = 0;

// const color = 0xFFFFFF;
const skyColor =   0xFFFFFF;//0xdc322f; 
const groundColor = 0xFFFFFF//0x6c71c4;
const intensity = 0.8;
const light3 = new THREE.HemisphereLight(skyColor, groundColor, intensity);
scene.add(light3);


function randColor(){

    colors = [
        // 0xb58900,
        // 0xcb4b16,
        0xdc322f,
        0xd33682,
        0x6c71c4,
        0x268bd2,
        0x2aa198,
        // 0x859900
    ]

    return colors[Math.floor(Math.random() * colors.length)]
}
function tint(c1, w){

    // console.log(c1)

    let r = parseInt(c1.substring(0,2), 16)
    let g = parseInt(c1.substring(2,4), 16)
    let b = parseInt(c1.substring(4), 16)

    // console.log(r, g, b)

    r = Math.floor(r + (w * (255 - r)))
    g = Math.floor(g + (w * (255 - g)))
    b = Math.floor(b + (w * (255 - b)))

    r = r.toString(16)
    g = g.toString(16)
    b = b.toString(16)

    num = "" + r + g + b

    return parseInt(num, 16)

}

var frameNum = 0
var currColer = 0xb58900
var projectionsCounter = 0;

var lifeSize = 70

lifeMain = new Life2D(lifeSize)
currColer = randColor()
// currColer =  0x6c71c4


lifeMain.randomize(0.15)

var cubeArr = [];
var projections = [];
var residue = [];
// var lifeMain = new Life2D(48)

for(let i = 0; i < lifeSize; i++){

    cubeArr[i] = []

    for(let j = 0; j < lifeSize; j++){

        let tempColor = randColor()
        let tempMat = new THREE.MeshBasicMaterial( { color: tempColor} );

        let tempCube = new THREE.Mesh(geometry, tempMat);
        tempCube.position.x = -lifeSize/2 + i
        tempCube.position.z = -lifeSize/2 + j

        tempCube.position.y =  1 
        cubeArr[i][j] = tempCube
        scene.add(cubeArr[i][j])
    }
}

const animate = function () {

    frameNum++;
    // requestAnimationFrame( animate );

    //reset base every 48 frames
    if(frameNum % 48 == 1){

        //loop through base
        for(let i = 0; i < cubeArr.length; i++){
            for(let j= 0; j < cubeArr[i].length; j++){
    
                // let tempColor = randColor()
                let tempMat = new THREE.MeshBasicMaterial( { color: currColer} );
                cubeArr[i][j].material = tempMat

            }
        }

        //loop through projections and delete all old objects from scene
        for(let i = 0; i < residue.length; i++){
            scene.remove(residue[i])
        }

        residue = []

        projections = []
        projectionsCounter = 0;
    }
    //otherwise propogate upwards
    else{

        projectionsCounter++;

        projections.push(Array.from(lifeMain.state))
        lifeMain.update()

        let tempColor = tint(currColer.toString(16), projectionsCounter/lifeSize)
        // console.log(tempColor)
        let tempMatDraw = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: false} );

        for(let row = 0; row < projections[projections.length-1].length; row++){
            for(let col = 0; col < projections[projections.length-1][row].length; col++){

                //check if cell is alive
                if(projections[projections.length-1][row][col]){

                    let tempCube = new THREE.Mesh(geometry, tempMatDraw);
                    tempCube.position.x = -lifeSize/2 + row
                    tempCube.position.z = -lifeSize/2 + col

                    tempCube.position.y =  projections.length 
                    projections[projections.length-1][row][col] = tempCube
                    scene.add(projections[projections.length-1][row][col])

                    //marked for deletion
                    residue.push(projections[projections.length-1][row][col])
                }

            }
        }

        if(projectionsCounter >= 2){

            let tempMat = new THREE.MeshLambertMaterial( { color: tempColor, wireframe: false} );

            for(let row = 0; row < projections[projections.length-2].length; row++){
                for(let col = 0; col < projections[projections.length-2][row].length; col++){
    
                    //check if cell is alive
                    if(projections[projections.length-2][row][col]){
    
                        projections[projections.length-2][row][col].material = tempMat
                    }
    
                }
            }
        }
    }

    renderer.render( scene, camera );
    drawFrame1()
};

var pause = setInterval(animate, 110);
var paused = false;

// setInterval(clear, 50)

function Pause(){

    if(!paused){
        clearInterval(pause);
        paused = true;
        document.getElementById("pause").innerHTML = "Resume"
    }else{
        pause = setInterval(animate, 110);
        paused = false;
        document.getElementById("pause").innerHTML = "Pause"
    }
}

function Reset(){
    frameNum = 0;
    lifeMain.randomize(0.15)
    currColer = randColor()

    //loop through base
    for(let i = 0; i < cubeArr.length; i++){
        for(let j= 0; j < cubeArr[i].length; j++){

            // let tempColor = randColor()
            let tempMat = new THREE.MeshBasicMaterial( { color: currColer} );
            cubeArr[i][j].material = tempMat

        }
    }

    //loop through projections and delete all old objects from scene
    for(let i = 0; i < residue.length; i++){
        scene.remove(residue[i])
    }

    residue = []
    projections = []
    projectionsCounter = 0;

    // pause = setInterval(animate, 110);
    // paused = false;
    // document.getElementById("pause").innerHTML = "Pause"
}


function clear(){

    let counter = 0;

    while(residue.length != 0 && counter < 100){
        scene.remove(residue.shift())
        counter++;
    }
}