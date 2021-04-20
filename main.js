//define 2D Game of life object
function Life2D(size){

    //this line is complicated but will create a 2D array full of 0s
    this.state = Array.from(Array(size), _ => Array(size).fill(0));
    this.nextState = Array.from(Array(size), _ => Array(size).fill(0));

    //calculate next generation
    this.update = function(){

        //reset next state to zeros
        this.nextState = Array.from(Array(size), _ => Array(size).fill(0));

        //loop through all cells
        for(let row = 0; row < this.state.length; row++){
            for(let col = 0; col < this.state[row].length; col++){
                
                let cell = this.state[row][col]

                //sum up number of alive neighbors
                let neighbors = 0

                //poll neighbors TODO add wraparound

                //(1)topleft
                if(row > 0 && col > 0){
                    neighbors += this.state[row-1][col-1]
                }
                //(2)topmid
                if(row > 0){
                    neighbors += this.state[row-1][col]
                }
                //(3)topright
                if(row > 0 && col < this.state[row].length - 1){
                    neighbors += this.state[row-1][col+1]
                }
                //(4)midright
                if(col < this.state[row].length - 1){
                    neighbors += this.state[row][col+1]
                }
                //(5)lowright
                if(row < this.state.length - 1 && col < this.state[row].length - 1){
                    neighbors += this.state[row+1][col+1]
                }
                //(6)lowmid
                if(row < this.state.length - 1){
                    neighbors += this.state[row+1][col]
                }
                //(7)lowleft
                if(row < this.state.length - 1 && col > 0){
                    neighbors += this.state[row+1][col-1]
                }
                //(8)midleft
                if(col > 0){
                    neighbors += this.state[row][col-1]
                }


                //decide if cell lives or dies
                if(cell == 0 && neighbors == 3){
                    this.nextState[row][col] = 1
                }else if(cell == 1 && (neighbors == 2 || neighbors == 3)){
                    this.nextState[row][col] = 1
                }

            }
        }

        this.state = Array.from(this.nextState);
        this.nextState = Array.from(Array(size), _ => Array(size).fill(0));

    }

    //fill in board withs 1s with probability p
    this.randomize = function(p){

        //loop through all cells
        for(let row = 0; row < this.state.length; row++){
            for(let col = 0; col < this.state[row].length; col++){

                if(Math.random() < p){
                    this.state[row][col] = 1;
                }

            }
        }
    }
}
