const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 90, (.75*window.innerWidth) / window.innerHeight, 0.1, 1000 );

canvas = document.getElementById("canvasMain")

const renderer = new THREE.WebGLRenderer({canvas: canvas, alpha: true});
renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial( { color: 	randColor(), wireframe: true } );


camera.position.z = 35;
camera.position.y = 65;
camera.position.x = 10;
camera.rotation.x = -0.9;
camera.rotation.z = 0;

// const color = 0xFFFFFF;
const skyColor =   0xFFFFFF;//0xdc322f; 
const groundColor = 0xFFFFFF//0x6c71c4;
const intensity = 0.8;
const light3 = new THREE.HemisphereLight(skyColor, groundColor, intensity);
scene.add(light3);


var cubeArr = [];
var projections = [];
var lifeMain = new Life2D(48)

for(let i = 0; i < 48; i++){

    cubeArr[i] = []

    for(let j = 0; j < 48; j++){

        let tempColor = randColor()
        let tempMat = new THREE.MeshBasicMaterial( { color: tempColor} );

        let tempCube = new THREE.Mesh(geometry, tempMat);
        tempCube.position.x = -24 + i
        tempCube.position.z = -24 + j

        tempCube.position.y =  1 
        cubeArr[i][j] = tempCube
        scene.add(cubeArr[i][j])
    }
}

function randColor(){

    colors = [
        // 0xb58900,
        0xcb4b16,
        0xdc322f,
        0xd33682,
        0x6c71c4,
        0x268bd2,
        0x2aa198,
        // 0x859900
    ]

    return colors[Math.floor(Math.random() * colors.length)]
}

var frameNum = 0
var currColer = 0xb58900
var projectionsCounter = 0;

const animate = function () {

    frameNum++;
    // requestAnimationFrame( animate );

    //reset base every 48 frames
    if(frameNum % 48 == 1){

        lifeMain = new Life2D(48)
        currColer = randColor()
        lifeMain.randomize(0.15)

        //loop through base
        for(let i = 0; i < cubeArr.length; i++){
            for(let j= 0; j < cubeArr[i].length; j++){
    
                // let tempColor = randColor()
                let tempMat = new THREE.MeshBasicMaterial( { color: currColer} );
                cubeArr[i][j].material = tempMat

            }
        }

        //loop through projections and delete all old objects from scene
        for(let i = 0; i < projections.length; i++){
            for(let row = 0; row < projections[i].length; row++){
                for(let col = 0; col < projections[i][row].length; col++){

                    if(projections[i][row][col]){
                        scene.remove(projections[i][row][col])
                    }

                }
            }
        }

        projections = []
        projectionsCounter = 0;
    }
    //otherwise propogate upwards
    else{

        projectionsCounter++;

        projections.push(Array.from(lifeMain.state))
        lifeMain.update()

        let tempColor = tint(currColer.toString(16), projectionsCounter/48)
        // console.log(tempColor)
        let tempMatDraw = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: false} );

        for(let row = 0; row < projections[projections.length-1].length; row++){
            for(let col = 0; col < projections[projections.length-1][row].length; col++){

                //check if cell is alive
                if(projections[projections.length-1][row][col]){

                    let tempCube = new THREE.Mesh(geometry, tempMatDraw);
                    tempCube.position.x = -24 + row
                    tempCube.position.z = -24 + col

                    tempCube.position.y =  projections.length 
                    projections[projections.length-1][row][col] = tempCube
                    scene.add(projections[projections.length-1][row][col])
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
};

setInterval(animate, 100);
// animate();

function tint(c1, w){

    console.log(c1)

    let r = parseInt(c1.substring(0,2), 16)
    let g = parseInt(c1.substring(2,4), 16)
    let b = parseInt(c1.substring(4), 16)

    console.log(r, g, b)

    r = Math.floor(r + (w * (255 - r)))
    g = Math.floor(g + (w * (255 - g)))
    b = Math.floor(b + (w * (255 - b)))

    r = r.toString(16)
    g = g.toString(16)
    b = b.toString(16)

    num = "" + r + g + b

    return parseInt(num, 16)

}